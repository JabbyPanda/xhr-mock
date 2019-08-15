export class MockEventTarget implements EventTarget {
  private listeners?: {
    [type: string]: EventListenerOrEventListenerObject[];
  } = {};

  public addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject | null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    options?: boolean | AddEventListenerOptions,
  ): void {
    this.listeners = this.listeners || {};

    if (!listener) {
      return;
    }

    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }

    //handleEvent
    if (this.listeners[type].indexOf(listener) === -1) {
      this.listeners[type].push(listener);
    }

    // TODO: handle once
    // TODO: handle passive
  }

  public removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject | null = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    options?: boolean | EventListenerOptions,
  ): void {
    this.listeners = this.listeners || {};

    if (!listener) {
      return;
    }

    if (!this.listeners[type]) {
      return;
    }

    const index = this.listeners[type].indexOf(listener);
    if (index !== -1) {
      this.listeners[type].splice(index, 1);
    }

    // TODO: handle once
    // TODO: handle passive
  }

  public dispatchEvent(event: Event): boolean {
    this.listeners = this.listeners || {};

    /* eslint-disable @typescript-eslint/no-explicit-any */
    //set the event target
    (event as any).target = this;
    (event as any).currentTarget = this;

    //call any built-in listeners
    //FIXME: the listener should be added on set
    const method = (this as any)[`on${event.type}`];
    /* eslint-enable @typescript-eslint/no-explicit-any */
    if (method) {
      method.call(this, event);
    }

    if (!this.listeners[event.type]) {
      return true;
    }

    this.listeners[event.type].forEach(listener => {
      if (typeof listener === 'function') {
        listener.call(this, event);
      } else {
        listener.handleEvent.call(this, event);
      }
    });
    return true; //TODO: return type based on .cancellable and .preventDefault()
  }
}

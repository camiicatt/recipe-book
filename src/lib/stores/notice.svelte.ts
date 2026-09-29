class NoticeStore {
    message = $state<string | null>(null);
    private timer: ReturnType<typeof setTimeout> | undefined;

    show(message: string) {
        this.message = message;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => this.hide(), 4000);   // disappears on its own
    }

    hide() {
        clearTimeout(this.timer);
        this.message = null;
    }
}

export const notice = new NoticeStore();

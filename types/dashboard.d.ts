
declare module "dashboard" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Card {
        title: string;
        message: string;
        _id: string;
        tags: Tag[];
    }

    interface Tag {
        title: string;
        color: string;
        _id: string;

    }
    type NotificationType = 'success' | 'info' | 'warning' | 'error';


}
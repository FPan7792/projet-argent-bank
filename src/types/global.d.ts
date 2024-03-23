export {};

declare global {
function createBrowserRouter(
    routes: RouteObject[],
    opts?: {
        basename?: string;
        future?: FutureConfig;
        hydrationData?: HydrationState;
        window?: Window;
    }
    ): RemixRouter;

    type HomeFeatureItem = {
        imgIcon : string,
        imgAlt : string,
        itemTitle: string,
        itemDescription: string
    }
}

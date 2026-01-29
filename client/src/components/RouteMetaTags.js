import { useLocation } from "react-router-dom";
import MetaTags from "./MetaTags";
import { getMetaForRoute } from "../utils/routeMetaConfig";

/**
 * Component that automatically sets meta tags based on the current route
 * Add this to your App.js or wrap your routes with it
 */
function RouteMetaTags() {
  const location = useLocation();
  const meta = getMetaForRoute(location.pathname);

  return <MetaTags {...meta} />;
}

export default RouteMetaTags;


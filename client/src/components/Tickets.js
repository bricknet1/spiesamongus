import { useEffect } from "react";
import HamburgerMenuHeader from "./HamburgerMenuHeader.js";
import SocialFooter from "./SocialFooter.js";
import useDeviceType from "./UseDeviceType.js";
import Questions from "./Questions.js";

function Tickets() {
  const isMobile = useDeviceType();
  const orangeBar = isMobile ? "orangeBar" : "orangeBarDesktop";

  const pageContentStyle = {
    paddingBottom: isMobile ? "3vw" : "10px"
  };

  const mainStyle = {
    fontSize: isMobile ? "4.5vw" : "18px",
    fontWeight: "normal",
    width: isMobile ? "90vw" : "1000px",
    paddingLeft: isMobile ? "5vw" : "",
    lineHeight: isMobile ? "8vw" : "30px",
    margin: isMobile ? "" : "0 auto",
    textAlign:"center"
  };

  useEffect(() => {
    const f = document.createElement("iframe");
    f.src = "https://offthecouch.io/book/spies";
    f.width = "100%";
    f.allow = "payment";
    f.scrolling = "no";
    f.style.border = "none";
    f.style.display = "block";
    f.style.overflow = "hidden";
    f.style.height = "auto";

    function findPosY(o) {
      let t = 0;
      while (o.offsetParent) {
        t += o.offsetTop;
        o = o.offsetParent;
      }
      return t;
    }

    function insertGoogleAnalyticsScript(i) {
      if (!i) return;
    
      if (!window.dataLayer) {
        window.dataLayer = [];
      }
    
      function gtag() {
        window.dataLayer.push(arguments);
      }
    
      if (!window.gtag) {
        const s = document.createElement("script");
        s.async = true;
        s.onload = () => {
          window.gtag = gtag;
          gtag("js", new Date());
          gtag("config", i);
        };
        s.src = "https://www.googletagmanager.com/gtag/js?id=" + i;
        document.head.appendChild(s);
      }
    
      gtag("event", "page_view");
    }
    

    const handleMessage = (e) => {
      if (e.origin === "https://offthecouch.io") {
        if (e.data.action === "updateHeight") {
          f.style.height = e.data.height + "px";
        }
        if (e.data.action === "scrollToTop") {
          const scrollTop = findPosY(document.getElementById("otcContainer"));
          window.scrollTo({ top: scrollTop - 30, behavior: "smooth" });
        }

        switch (e.data.eventType) {
          case "page_view":
            insertGoogleAnalyticsScript(e.data.id);
            break;
          case "add_to_cart":
          case "begin_checkout":
          case "purchase":
          case "success":
            if (window.gtag) {
              window.gtag("event", e.data.eventType, {
                currency: e.data.currency,
                value: e.data.eventValue,
              });
            }
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener("message", handleMessage);
    const container = document.getElementById("otcContainer");
    if (container) {
      container.appendChild(f);
    }

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div className="pageContent" style={pageContentStyle}>
      <div className={orangeBar}>TICKETS</div>
      <HamburgerMenuHeader unfixed={true}/>
      <div style={mainStyle}>
        <div id="otcContainer"></div>
      </div>
      <Questions />
      <SocialFooter />
    </div>
  );
}

export default Tickets;

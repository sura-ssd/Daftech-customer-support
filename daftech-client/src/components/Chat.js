import React from "react";
import { Helmet } from "react-helmet";
function Chat(){
    return (
        <div>
           <Helmet>
           <script type="text/javascript">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/64cb7520cc26a871b02cfe65/1h6tc32j8';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </script>
           </Helmet>
        </div>
    )
}
export default Chat;
import ComingSoon from "@/component/Home/ComingSoon";
import schema from "@/lib/schema";
import React from "react";

const page = () => {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema?.localBusiness),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema?.organization),
        }}
      />
      <ComingSoon />
    </div>
  );
};

export default page;

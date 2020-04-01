import Blogs from "@/components/Bogs/Bogs";
import BlogHeading from "@/components/Bogs/Heading";

import React from "react";

function page() {
  return (
    <div className="flex flex-col pt-24 gap-20 w-full px-3 sm:px-5 pb-20 bg-stone-100">
      <BlogHeading />
      <Blogs />
    </div>
  );
}

export default page;

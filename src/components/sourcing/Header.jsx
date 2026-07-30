import React from "react";
import SectionIntro from "../shared/SectionIntro";

const Header = () => {
  return (
    <SectionIntro
      badge="Sourcing Request"
      title={
        <>
          Tell Us Your{" "}
          <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
            Sourcing Needs
          </span>
        </>
      }
      description="Submit your product requirements and our team will review supplier options, logistics constraints, and next steps for a practical quote."
      className="mb-12 max-w-4xl"
    />
  );
};

export default Header;

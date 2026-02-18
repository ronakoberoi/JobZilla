import { Link, useLocation } from "react-router-dom";

const NavLinks = (role:any) => {

  const applicantLinks = [
    { name: "Find Jobs", url: "/find-jobs" },
    { name: "Find Talent", url: "/find-talent" },
    { name: "Job History", url: "/job-history" },
  ];

  const employerLinks = [
    { name: "Find Jobs", url: "/find-jobs" },
    { name: "Find Talent", url: "/find-talent" },
    { name: "Post Job", url: "/post-job/0" },
    { name: "Posted Jobs", url: "/posted-jobs/0" },
  ];

  const links = role === "EMPLOYER" ? employerLinks : applicantLinks;

  const location = useLocation();

  return (
    <div className="flex gap-5 h-full items-center text-mine-shaft-300">
      {links.map((link:any, index:number) => {
        const isActive = location.pathname.startsWith(link.url);

        return (
          <div
            key={index}
            className={`${
              isActive
                ? "border-bright-sun-400 text-bright-sun-400"
                : "border-transparent"
            } border-t-[3px] h-full flex items-center`}
          >
            <Link to={link.url}>{link.name}</Link>
          </div>
        );
      })}
    </div>
  );
};

export default NavLinks;

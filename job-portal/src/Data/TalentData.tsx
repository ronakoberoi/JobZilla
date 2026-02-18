import { IconBriefcase, IconMapPin, IconRecharging, IconSearch } from "@tabler/icons-react";

const searchFields=[
    { title: "Job Title", icon: IconSearch, options: ['Designer', 'Developer', 'Product Manager', 'Marketing Specialist', 'Data Analyst', 'Sales Executive', 'Content Writer', 'Customer Support'] },
    { title: "Location", icon: IconMapPin, options: ['Delhi', 'Chandigarh', 'Pune', 'Banglore', 'Noida', 'Mumbai', 'Gurugram', 'Mohali'] },
    { title: "Skills", icon: IconRecharging, options: ["HTML","CSS","JavaScript","React",,"Node.js","Python","Java","SQL","MongoDB","Git","Testing and Debugging","AWS","Google Cloud"] },
]
const talents = [
    {
      name: "Ronak Oberoi",
      role: "Software Engineer",
      company: "Google",
      topSkills: ["React", "SpringBoot", "MongoDB"],
      about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente id nam eligendi nihil consectetur alias recusandae impedit quas hic mollitia!",
      expectedCtc: "₹48 - 60LPA",
      location: "Banglore, India",
      image:"avatar"
    },
    {
      name: "Sahil Asija",
      role: "Frontend Developer",
      company: "Facebook",
      topSkills: ["HTML", "CSS", "JavaScript"],
      about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente id nam eligendi nihil consectetur alias recusandae impedit quas hic mollitia!",
      expectedCtc: "₹40 - 55LPA",
      location: "Mumbai, India",
      image:"avatar"
    },
    {
      name: "Saksham Kathuria",
      role: "Backend Developer",
      company: "Amazon",
      topSkills: ["Node.js", "Express", "MySQL"],
      about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente id nam eligendi nihil consectetur alias recusandae impedit quas hic mollitia!",
      expectedCtc: "₹50 - 65LPA",
      location: "Punjab, India",
      image:"avatar"
    },
    {
        name: "Sakshi Bhatia",
        role: "UX/UI Designer",
        company: "Adobe",
        topSkills: ["Figma", "Sketch", "InVision"],
        about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente id nam eligendi nihil consectetur alias recusandae impedit quas hic mollitia!",
        expectedCtc: "₹35 - 50LPA",
        location: "Delhi, India",
        image:"avatar2"
      },
    {
      name: "Yudhish Garg",
      role: "Full Stack Developer",
      company: "Microsoft",
      topSkills: ["Python", "Django", "React"],
      about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente id nam eligendi nihil consectetur alias recusandae impedit quas hic mollitia!",
      expectedCtc: "₹45 - 60LPA",
      location: "Chandigarh, India",
      image:"avatar"
    },
    {
        name: "Palak Garg",
        role: "DevOps Engineer",
        company: "Netflix",
        topSkills: ["Docker", "Kubernetes", "AWS"],
        about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente id nam eligendi nihil consectetur alias recusandae impedit quas hic mollitia!",
        expectedCtc: "₹50 - 65LPA",
        location: "Mohali, India",
        image:"avatar1"
      },
    {
      name: "Somil Jaisingh",
      role: "Data Scientist",
      company: "IBM",
      topSkills: ["Python", "R", "Machine Learning"],
      about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente id nam eligendi nihil consectetur alias recusandae impedit quas hic mollitia!",
      expectedCtc: "₹55 - 70LPA",
      location: "Noida, India",
      image:"avatar"
    },    
    {
        name: "Rajni Sharma",
        role: "Mobile App Developer",
        company: "Apple",
        topSkills: ["Swift", "iOS", "Xcode"],
        about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente id nam eligendi nihil consectetur alias recusandae impedit quas hic mollitia!",
        expectedCtc: "₹55 - 70LPA",
        location: "Gurugram, India",
        image:"avatar2"
      },
      {
        name: "Ramu Sharma",
        role: "Cybersecurity Analyst",
        company: "Cisco",
        topSkills: ["Penetration Testing", "Network Security"],
        about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente id nam eligendi nihil consectetur alias recusandae impedit quas hic mollitia!",
        expectedCtc: "₹60 - 75LPA",
        location: "Rajasthan, India",
        image:"avatar"
      }
  ];
  const profile={
    name: "Jarrod Wood",
    role: "Software Engineer",
    company: "Google",
    location: "New York, United States",
    about: "As a Software Engineer at Google, I specialize in building scalable and high-performance applications. My expertise lies in integrating front-end and back-end technologies to deliver seamless user experiences. With a strong foundation in React and SpringBoot, and a focus on MongoDB for database solutions, I am passionate about leveraging the latest technologies to solve complex problems and drive innovation. My goal is to create impactful software that enhances productivity and meets user needs effectively.",
    skills: ["React", "SpringBoot", "MongoDB", "HTML", "CSS", "JavaScript", "Node.js", "Express", "MySQL", "Python", "Django", "Figma", "Sketch", "Docker", "AWS"],
    experience: [
      {
        title: "Software Engineer III",
        company: "Google",
        location: "New York, United States",
        startDate: "Apr 2022",
        endDate: "Present",
        description: "As a Software Engineer at Google, I am responsible for designing, developing, and maintaining scalable software solutions that enhance user experience and improve operational efficiency. My role involves collaborating with cross-functional teams to define project requirements, develop technical specifications, and implement robust applications using cutting-edge technologies. I actively participate in code reviews, ensuring adherence to best practices and coding standards, and contribute to the continuous improvement of the development process."
      },
      {
        title: "Software Engineer",
        company: "Microsoft",
        location: "Seattle, United States",
        startDate: "Jun 2018",
        endDate: "Mar 2022",
        description: "At Microsoft, I worked on developing and optimizing cloud-based applications, focusing on enhancing performance and scalability. I collaborated with product managers and designers to create innovative features that improved user engagement. My responsibilities included writing clean, maintainable code, performing code reviews, and mentoring junior developers. I played a key role in migrating legacy applications to modern cloud infrastructure, resulting in significant cost savings and improved efficiency."
      }
    ],
    certifications: [
      {
        name: "Google Professional Cloud Architect",
        issuer: "Google",
        issueDate: "Aug 2023",
        certificateId: "CB72982GG"
      },
      {
        name: "Microsoft Certified: Azure Solutions Architect Expert",
        issuer: "Microsoft",
        issueDate: "May 2022",
        certificateId: "MS12345AZ"
      }
    ]
  }
  
  
  
export {searchFields, talents, profile};
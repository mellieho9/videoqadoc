// "use client";

// import { Navbar, Dropdown, Button } from "@nextui-org/react";
// import { ArrowLeft, ArrowRight, Home, ChevronDown } from "lucide-react";

// export default function VideoNavbar() {
//   return (
//     <Navbar isBordered className="bg-white shadow-md">
//       {/* Left Side (Navigation Buttons) */}
//       <Navbar className="flex items-center space-x-4">
//         <Button
//           color="primary"
//           icon={<ArrowLeft size={20} />}
//           aria-label="Back"
//         />
//         <Button
//           flat
//           color="primary"
//           icon={<ArrowRight size={20} />}
//           aria-label="Forward"
//         />
//         <Button
//           flat
//           color="primary"
//           icon={<Home size={20} />}
//           aria-label="Home"
//         />
//       </Navbar>

//       {/* Center Title */}
//       <Navbar className="justify-center">
//         <h1 className="text-xl font-semibold">Video Navigation</h1>
//       </Navbar>

//       {/* Right Side (Dropdown for Completed Videos/Questions) */}
//       <Navbar className="justify-end">
//         <Dropdown placement="bottom-right">
//           <Drxopdown.Trigger>
//             <Button auto color="primary" iconRight={<ChevronDown size={20} />}>
//               Completed Content
//             </Button>
//           </Dropdown.Trigger>
//           <Dropdown.Menu aria-label="Completed Videos and Questions">
//             <Dropdown.Section title="Video 1">
//               <Dropdown.Item key="video1-q1">Question 1</Dropdown.Item>
//               <Dropdown.Item key="video1-q2">Question 2</Dropdown.Item>
//             </Dropdown.Section>
//             <Dropdown.Section title="Video 2">
//               <Dropdown.Item key="video2-q1">Question 1</Dropdown.Item>
//               <Dropdown.Item key="video2-q2">Question 2</Dropdown.Item>
//             </Dropdown.Section>
//             {/* Add more sections as needed */}
//           </Dropdown.Menu>
//         </Dropdown>
//       </Navbar.Content>
//     </Navbar>
//   );
// }

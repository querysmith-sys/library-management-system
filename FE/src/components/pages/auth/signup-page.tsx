            //  not needed as of now

// import { Footer } from "../../footer";
// import { useNavigate } from "react-router-dom";

// const SignupPage = () => {
//     const navigate = useNavigate();
//   return (
//     <div className="min-h-screen bg-white p-8 flex flex-col items-center font-sans text-gray-800">
//       <div className="w-full max-w-4xl">
//         <div className="flex flex-col md:flex-row items-center justify-between border border-gray-300 rounded p-4 mb-6 bg-white">
//           <div className="flex items-center gap-3 mb-4 md:mb-0">
//             <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center border border-orange-100">
//               <span className="text-xl">
//                 <img src="/libimg.avif" alt="libimg" />
//               </span>
//             </div>
//             <h1 className="text-xl font-bold tracking-tight">
//               Library Management System
//             </h1>
//           </div>

//           <div className="flex gap-3">
//             <button onClick={() => {navigate('/auth/login')}} className="px-4 py-2 text-sm font-medium text-blue-700 border border-blue-600 rounded hover:bg-blue-50 transition-colors">
//               Login
//             </button>
//             <button className="px-4 py-2 text-sm font-medium text-blue-700 border border-blue-600 rounded hover:bg-blue-50 transition-colors">
//               Help
//             </button>
//           </div>
//         </div>

//         <div className="border border-gray-300 rounded overflow-hidden">
//           <div className="bg-gray-50 border-b border-gray-300 p-4">
//             <h2 className="font-semibold text-gray-700">Registration</h2>
//           </div>

//           <div className="p-8">
//             <div className="grid gap-6 max-w-lg">
//               <div className="flex flex-col gap-2">
//                 <label className="text-sm font-medium text-gray-600">
//                   Username
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter username"
//                   className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//                 />
//               </div>

//               <div className="flex flex-col gap-2">
//                 <label className="text-sm font-medium text-gray-600">
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   placeholder="name@example.com"
//                   className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//                 />
//               </div>

//               <div className="flex flex-col gap-2">
//                 <label className="text-sm font-medium text-gray-600">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   placeholder="••••••••"
//                   className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//                 />
//               </div>
//             </div>

//             <div className="mt-8 flex gap-4">
//               <button className="px-6 py-2 text-sm font-medium text-black border border-black rounded hover:bg-gray-50 transition-colors">
//                 Sign Up
//               </button>
//               <button className="px-6 py-2 text-sm font-medium text-black border border-black rounded hover:bg-gray-50 transition-colors">
//                 Clear Form
//               </button>
//             </div>
//           </div>
//         </div>

//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default SignupPage;

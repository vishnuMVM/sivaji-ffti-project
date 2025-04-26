// import { Button, IconButton, Tooltip, Typography } from "@material-tailwind/react";
// import { EditPencil } from "iconoir-react";
// import { useState, useMemo } from "react";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import { useLocation, useNavigate } from "react-router-dom";

// const SizeOptions = [
//   "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "6XL", "7XL", "8XL", "9XL", "10XL",
//   "16 (6 months)", "18 (1 year)", "20 (2 years)", "22 (3-4 years)", "24 (4-6 years)",
//   "26 (6-7 years)", "28 (7-8 years)", "30 (9 years)", "32 (10 years)", "34 (11-12 years)"
// ];

// const TABLE_HEAD = [
//   { label: "Person Name", key: "PersonName" },
//   { label: "Jersey Number", key: "JerseyNumber" },
//   { label: "Size", key: "Size" },
//   { label: "Neck", key: "Neck" },
//   { label: "Sleeves", key: "Sleeves" },
//   { label: "", key: "Actions" },
// ];

// const JerseyOrdersTable = ({ data, onEdit }) => {
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
//   const navigate = useNavigate();

//   const location = useLocation();
//   const { hash, pathname, search } = location;
//   console.log("Location:", {
//     hash,
//     pathname,
//     search,
//   });
  
//   const sortedData = useMemo(() => {
//     if (!sortConfig.key) return data;

//     const sorted = [...data].sort((a, b) => {
//       let aValue = a[sortConfig.key];
//       let bValue = b[sortConfig.key];

//       // Special sorting for Size column
//       if (sortConfig.key === "Size") {
//         return (SizeOptions.indexOf(aValue) - SizeOptions.indexOf(bValue)) * (sortConfig.direction === "asc" ? 1 : -1);
//       }

//       // Default string/number sorting
//       if (typeof aValue === "string" && typeof bValue === "string") {
//         return (aValue.localeCompare(bValue)) * (sortConfig.direction === "asc" ? 1 : -1);
//       } else {
//         return (aValue - bValue) * (sortConfig.direction === "asc" ? 1 : -1);
//       }
//     });

//     return sorted;
//   }, [data, sortConfig]);

//   const handleSort = (key) => {
//     setSortConfig((prev) => {
//       if (prev.key === key) {
//         return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
//       }
//       return { key, direction: "asc" };
//     });
//   };

//   const handleDownloadPDF = () => {
//     if (!data || data.length === 0) {
//       console.error("No data available for PDF generation");
//       return;
//     }
//     try {
//       const doc = new jsPDF();
//       const tableColumn = ["Person Name", "Jersey Number", "Size", "Neck", "Sleeves"];
//       const tableRows = [];

//       const sortedForPDF = [...data].sort((a, b) => {
//         const indexA = SizeOptions.indexOf(a.Size);
//         const indexB = SizeOptions.indexOf(b.Size);
//         return indexA - indexB;
//       });

//       const sizeCounts = {};
//       sortedForPDF.forEach((order) => {
//         sizeCounts[order.Size] = (sizeCounts[order.Size] || 0) + 1;
//       });

//       sortedForPDF.forEach((order) => {
//         tableRows.push([
//           order.PersonName,
//           order.JerseyNumber,
//           order.Size,
//           order.Neck,
//           order.Sleeves,
//         ]);
//       });

//       doc.setFontSize(18);
//       doc.text("Jersey Orders", 14, 22);

//       doc.setFontSize(12);
//       const sizeCountString = Object.entries(sizeCounts)
//         .map(([size, count]) => `${size}: ${count}`)
//         .join("  ");
//       doc.text(`Size Count: ${sizeCountString}`, 14, 32);

//       autoTable(doc, {
//         startY: 40,
//         head: [tableColumn],
//         body: tableRows,
//         didParseCell: function (data) {
//           if (data.section === "body" && data.column.index === 4) {
//             const sleevesText = data.cell.raw;
//             if (sleevesText && sleevesText.toLowerCase() === "full sleeves") {
//               data.cell.styles.fillColor = [255, 255, 0]; // Yellow background
//             }
//           }
//         },
//       });

//       doc.save("jersey_orders.pdf");
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//     }
//   };
//   const viewInFullPage = () => {
//     navigate("/jersey-details");

//   }

//   return (
//     <div className="w-full h-screen rounded-lg border border-surface p-4 flex flex-col">
//       {/* Download PDF Button */}
//       <Typography variant="h6" color="blue-gray">
//     Ordered Jerseys
//   </Typography>
//       <div className="flex justify-end mb-4 gap-4 shrink-0">
//     { pathname !== "/jersey-details" && <Button variant="gradient" size="sm" onClick={viewInFullPage}>
//     View in Full Page
//     </Button>}
//         <Button onClick={handleDownloadPDF} color="info" size="sm">
//           Download PDF
//         </Button>
//       </div>

//       {/* Scrollable Table */}
//       <div className="overflow-auto grow border w-full border-surface-light rounded-lg">
//         <table className="w-full text-left">
//           <thead className="border-b border-surface p-2 bg-surface-light text-sm font-medium text-foreground dark:bg-surface-dark">
//             <tr>
//               {TABLE_HEAD.map((head) => (
//                 <th
//                   key={head.key}
//                   className="px-2.5 py-2 text-start font-medium cursor-pointer select-none"
//                   onClick={() => head.key !== "Actions" && handleSort(head.key)}
//                 >
//                   {head.label}
//                   {sortConfig.key === head.key && (
//                     <span className="ml-1">
//                       {sortConfig.direction === "asc" ? "▲" : "▼"}
//                     </span>
//                   )}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {sortedData?.map((order, index) => {
//               const isLast = index === data.length - 1;
//               const classes = isLast ? "p-4" : "p-4 border-b border-surface-light";
//               return (
//                 <tr key={index}>
//                   <td className={classes}>
//                     <Typography type="small" className="font-bold">
//                       {order.PersonName}
//                     </Typography>
//                   </td>
//                   <td className={classes}>
//                     <Typography type="small">{order.JerseyNumber}</Typography>
//                   </td>
//                   <td className={classes}>
//                     <Typography type="small">{order.Size}</Typography>
//                   </td>
//                   <td className={classes}>
//                     <Typography type="small">{order.Neck}</Typography>
//                   </td>
//                   <td className={classes}>
//                     <Typography type="small">{order.Sleeves}</Typography>
//                   </td>
//                   <td className={classes}>
//                     <Tooltip content="Edit">
//                       <Tooltip.Trigger>
//                         <IconButton size="sm" onClick={() => onEdit(index)}>
//                           <EditPencil className="h-4 w-4" />
//                         </IconButton>
//                       </Tooltip.Trigger>
//                     </Tooltip>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default JerseyOrdersTable;

import { Button, IconButton, Tooltip, Typography } from "@material-tailwind/react";
import { EditPencil, Trash } from "iconoir-react"; // <- Added Trash icon
import { useState, useMemo } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useLocation, useNavigate } from "react-router-dom";

const SizeOptions = [
  "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "6XL", "7XL", "8XL", "9XL", "10XL",
  "16 (6 months)", "18 (1 year)", "20 (2 years)", "22 (3-4 years)", "24 (4-6 years)",
  "26 (6-7 years)", "28 (7-8 years)", "30 (9 years)", "32 (10 years)", "34 (11-12 years)"
];

const TABLE_HEAD = [
  { label: "Person Name", key: "PersonName" },
  { label: "Jersey Number", key: "JerseyNumber" },
  { label: "Size", key: "Size" },
  { label: "Neck", key: "Neck" },
  { label: "Sleeves", key: "Sleeves" },
  { label: "Actions", key: "Actions" }, // Renamed empty label to Actions
];

const JerseyOrdersTable = ({ data, onEdit, onDelete }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    const sorted = [...data].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];
      if (sortConfig.key === "Size") {
        return (SizeOptions.indexOf(aValue) - SizeOptions.indexOf(bValue)) * (sortConfig.direction === "asc" ? 1 : -1);
      }
      if (typeof aValue === "string" && typeof bValue === "string") {
        return (aValue.localeCompare(bValue)) * (sortConfig.direction === "asc" ? 1 : -1);
      } else {
        return (aValue - bValue) * (sortConfig.direction === "asc" ? 1 : -1);
      }
    });
    return sorted;
  }, [data, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const handleDownloadPDF = () => {
    if (!data || data.length === 0) {
      console.error("No data available for PDF generation");
      return;
    }
    try {
      const doc = new jsPDF();
      const tableColumn = ["Person Name", "Jersey Number", "Size", "Neck", "Sleeves"];
      const tableRows = [];

      const sortedForPDF = [...data].sort((a, b) => {
        const indexA = SizeOptions.indexOf(a.Size);
        const indexB = SizeOptions.indexOf(b.Size);
        return indexA - indexB;
      });

      const sizeCounts = {};
      sortedForPDF.forEach((order) => {
        sizeCounts[order.Size] = (sizeCounts[order.Size] || 0) + 1;
      });

      sortedForPDF.forEach((order) => {
        tableRows.push([
          order.PersonName,
          order.JerseyNumber,
          order.Size,
          order.Neck,
          order.Sleeves,
        ]);
      });

      doc.setFontSize(18);
      doc.text("Jersey Orders", 14, 22);

      doc.setFontSize(12);
      const sizeCountString = Object.entries(sizeCounts)
        .map(([size, count]) => `${size}: ${count}`)
        .join("  ");
      doc.text(`Size Count: ${sizeCountString}`, 14, 32);

      autoTable(doc, {
        startY: 40,
        head: [tableColumn],
        body: tableRows,
        didParseCell: function (data) {
          if (data.section === "body" && data.column.index === 4) {
            const sleevesText = data.cell.raw;
            if (sleevesText && sleevesText.toLowerCase() === "full sleeves") {
              data.cell.styles.fillColor = [255, 255, 0]; // Yellow background
            }
          }
        },
      });

      doc.save("jersey_orders.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const viewInFullPage = () => {
    navigate("/jersey-details");
  };
  const goBackToEditOrder = () => {
    navigate("/order-your-jersey");
  };

  return (
    <div className="w-full h-screen rounded-2xl border border-surface p-6 flex flex-col bg-white shadow-md">
      {/* Top Actions */}
     { pathname !== "/jersey-details" && <div className="flex items-center justify-between mb-6">
        <Typography variant="h5" color="blue-gray">
          Ordered Jerseys
        </Typography>
        <div className="flex gap-4">
            <Button variant="gradient" size="sm" onClick={viewInFullPage}>
              View in Full Page
            </Button>

          <Button onClick={handleDownloadPDF} color="info" size="sm">
            Download PDF
          </Button>
        </div>
      </div>}
      {pathname === "/jersey-details" &&  
      <div className="flex items-center justify-start mb-6">
       <Button variant="gradient" size="sm" onClick={goBackToEditOrder}>
              Go Back to Edit Order
            </Button>
      </div>
            }
      

      {/* Table */}
      <div className="overflow-auto grow rounded-xl border border-surface-light">
        <table className="w-full text-left text-gray-700">
          <thead className="bg-surface-light">
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head.key}
                  className="px-6 py-4 text-sm font-bold uppercase tracking-wide text-gray-600 cursor-pointer hover:text-blue-500 select-none"
                  onClick={() => head.key !== "Actions" && handleSort(head.key)}
                >
                  {head.label}
                  {sortConfig.key === head.key && (
                    <span className="ml-1">
                      {sortConfig.direction === "asc" ? "▲" : "▼"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData?.map((order, index) => {
              return (
                <tr
                  key={index}
                  className="hover:bg-blue-50 transition-colors duration-300"
                >
                  <td className="px-6 py-4">
                    <Typography variant="small" className="font-medium">
                      {order.PersonName}
                    </Typography>
                  </td>
                  <td className="px-6 py-4">
                    <Typography variant="small">{order.JerseyNumber}</Typography>
                  </td>
                  <td className="px-6 py-4">
                    <Typography variant="small">{order.Size}</Typography>
                  </td>
                  <td className="px-6 py-4">
                    <Typography variant="small">{order.Neck}</Typography>
                  </td>
                  <td className="px-6 py-4">
                    <Typography variant="small">{order.Sleeves}</Typography>
                  </td>
                 {pathname !== "/jersey-details"&& <td className="px-6 py-4 flex gap-2">
                    <Tooltip content="Edit">
                      <Tooltip.Trigger>
                        <IconButton
                          size="sm"
                          variant="gradient"
                          color="info"
                          className="rounded-full shadow-md"
                          onClick={() => onEdit(index)}
                        >
                          <EditPencil className="h-4 w-4" />
                        </IconButton>
                      </Tooltip.Trigger>
                    </Tooltip>
                    <Tooltip content="Delete">
                      <Tooltip.Trigger>
                        <IconButton
                          size="sm"
                          variant="gradient"
                          color="red"
                          className="rounded-full shadow-md"
                          onClick={() => onDelete(index)}
                        >
                          <Trash className="h-4 w-4" />
                        </IconButton>
                      </Tooltip.Trigger>
                    </Tooltip>
                  </td>}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JerseyOrdersTable;

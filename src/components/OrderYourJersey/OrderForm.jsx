// import {
//   Button,
//   Card,
//   CardBody,
//   CardHeader,
//   IconButton,
//   Input,
//   Select,
//   Typography,
// } from "@material-tailwind/react";
// import { useEffect, useState } from "react";

// import CommonDialog from "../GenericComponents/CommonDialog";
// import JerseyOrdersTable from "./JerseyOrdersTable";

// const NeckOptions = ["Rounded", "Collared", "VType"];
// const SleeveOptions = ["Half", "Full", "Sleeveless"];
// const SizeOptions = [
//   "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "6XL", "7XL", "8XL", "9XL", "10XL",
//   "16 (6 months)", "18 (1 year)", "20 (2 years)", "22 (3-4 years)", "24 (4-6 years)",
//   "26 (6-7 years)", "28 (7-8 years)", "30 (9 years)", "32 (10 years)", "34 (11-12 years)"
// ];

// const LOCAL_STORAGE_KEY = "jerseyOrders";

// const OrderForm = () => {
//   const [formData, setFormData] = useState({
//     PersonName: "",
//     JerseyNumber: "",
//     Size: "",
//     Neck: "",
//     Sleeves: "",
//   });

//   const [lastSelectedNeck, setLastSelectedNeck] = useState("");
//   const [lastSelectedSleeves, setLastSelectedSleeves] = useState("");

//   const [orderedPersons, setOrderedPersons] = useState(() => {
//     const storedOrders = localStorage.getItem(LOCAL_STORAGE_KEY);
//     return storedOrders ? JSON.parse(storedOrders) : [];
//   });

//   const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);
//   const [clearDialogContent, setClearDialogContent] = useState("");
//   const [clearDialogTitle, setClearDialogTitle] = useState("");
//   const [clearConfirmAction, setClearConfirmAction] = useState(() => {});
//   const [editingIndex, setEditingIndex] = useState(null);

//   useEffect(() => {
//     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(orderedPersons));
//   }, [orderedPersons]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSelectChange = (value, type) => {
//     if (type === "Neck") {
//       setLastSelectedNeck(value);
//     }
//     if (type === "Sleeves") {
//       setLastSelectedSleeves(value);
//     }

//     setFormData((prevData) => ({
//       ...prevData,
//       [type]: value,
//     }));
//   };

//   const handleAddPerson = (e) => {
//     e.preventDefault();
//     let { PersonName, JerseyNumber, Size, Neck, Sleeves } = formData;

//     // If Neck or Sleeves are not selected now, use the last selected values
//     if (!Neck && lastSelectedNeck) {
//       Neck = lastSelectedNeck;
//     }
//     if (!Sleeves && lastSelectedSleeves) {
//       Sleeves = lastSelectedSleeves;
//     }

//     if (!PersonName || !JerseyNumber || !Size || !Neck || !Sleeves) {
//       alert("Please fill in all the details.");
//       return;
//     }

//     const newFormData = { PersonName, JerseyNumber, Size, Neck, Sleeves };

//     if (editingIndex !== null) {
//       const updated = [...orderedPersons];
//       updated[editingIndex] = { ...newFormData };
//       setOrderedPersons(updated);
//       setEditingIndex(null);
//     } else {
//       setOrderedPersons((prev) => [...prev, { ...newFormData }]);
//     }

//     setFormData({
//       PersonName: "",
//       JerseyNumber: "",
//       Size: "",
//       Neck: "",
//       Sleeves: "",
//     });
//   };

//   const handleEditPerson = (index) => {
//     const person = orderedPersons[index];
//     setFormData(person);
//     setEditingIndex(index);
//     setLastSelectedNeck(person.Neck);
//     setLastSelectedSleeves(person.Sleeves);
//   };

//   const handleClearAllData = () => {
//     setClearDialogTitle("Clear All Orders?");
//     setClearDialogContent(
//       "Are you sure you want to clear all the stored jersey orders? This action cannot be undone."
//     );
//     setClearConfirmAction(() => confirmClearAllData);
//     setIsClearDialogOpen(true);
//   };



//   const confirmClearAllData = () => {
//     localStorage.removeItem(LOCAL_STORAGE_KEY);
//     setOrderedPersons([]);
//     setIsClearDialogOpen(false);
//   };

//   const cancelClearAllData = () => {
//     setIsClearDialogOpen(false);
//   };

//   return (
//     <div className="flex flex-col p-4 gap-3 overflow-y-auto w-full">
//       <Card className="mt-6 w-full h-">
//         <CardHeader color="blue-gray" className="p-4">
//           <Typography variant="h5" color="white">
//             Order Your Custom Jersey
//           </Typography>
//         </CardHeader>
//         <CardBody className="p-2">
//           <div className="flex flex-wrap gap-4 justify-around">
//             <div className="w-48">
//               <Input
//                 label="Person Name"
//                 name="PersonName"
//                 value={formData.PersonName}
//                 onChange={handleChange}
//                 placeholder="Enter name"
//               />
//             </div>
//             <div className="w-48">
//               <Input
//                 type="number"
//                 label="Jersey Number"
//                 name="JerseyNumber"
//                 value={formData.JerseyNumber}
//                 onChange={handleChange}
//                 placeholder="Enter number"
//               />
//             </div>
//             <div className="w-48">
//               <Select
//                 label="Neck Type"
//                 value={formData.Neck || lastSelectedNeck}
//                 onValueChange={(val) => handleSelectChange(val, "Neck")}
//               >
//                 <Select.Trigger placeholder="Select Neck" />
//                 <Select.List>
//                   {NeckOptions.map((option) => (
//                     <Select.Option key={option} value={option}>
//                       {option}
//                     </Select.Option>
//                   ))}
//                 </Select.List>
//               </Select>
//             </div>
//             <div className="w-48">
//               <Select
//                 label="Sleeve Type"
//                 value={formData.Sleeves || lastSelectedSleeves}
//                 onValueChange={(val) => handleSelectChange(val, "Sleeves")}
//               >
//                 <Select.Trigger placeholder="Select Sleeves" />
//                 <Select.List>
//                   {SleeveOptions.map((option) => (
//                     <Select.Option key={option} value={option}>
//                       {option}
//                     </Select.Option>
//                   ))}
//                 </Select.List>
//               </Select>
//             </div>
//             <div className="w-48">
//               <Select
//                 label="Size"
//                 value={formData.Size}
//                 onValueChange={(val) => handleSelectChange(val, "Size")}
//               >
//                 <Select.Trigger placeholder="Select Size" />
//                 <Select.List>
//                   {SizeOptions.map((option) => (
//                     <Select.Option key={option} value={option}>
//                       {option}
//                     </Select.Option>
//                   ))}
//                 </Select.List>
//               </Select>
//             </div>
//           </div>

//           <div className="flex justify-center gap-4 mt-6">
//             <Button onClick={handleAddPerson} color="success">
//               {editingIndex !== null ? "Update Order" : "Add Order"}
//             </Button>
//             <Button onClick={handleClearAllData} color="error">
//               Clear All Data
//             </Button>
//           </div>
//         </CardBody>
//       </Card>
//       <div className="overflow-y-auto h-screen p-4 w-full">
//   {orderedPersons?.length === 0 ? (
//     <Typography variant="small" className="text-gray-600">
//       No orders added yet.
//     </Typography>
//   ) : (
//     <div className="p-4">
//       <JerseyOrdersTable
//         data={orderedPersons}
//         onEdit={handleEditPerson}
//       />
//     </div>
//   )}
// </div>
//       <CommonDialog
//         open={isClearDialogOpen}
//         title={clearDialogTitle}
//         content={clearDialogContent}
//         onConfirm={clearConfirmAction}
//         onCancel={cancelClearAllData}
//       />
//     </div>
//   );
// };

// export default OrderForm;



import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  Switch,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

import CommonDialog from "../GenericComponents/CommonDialog";
import JerseyOrdersTable from "./JerseyOrdersTable";

const NeckOptions = ["Rounded", "Collared", "VType"];
const SleeveOptions = ["Half", "Full", "Sleeveless"];
const SizeOptions = [
  "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "6XL", "7XL", "8XL", "9XL", "10XL",
  "16 (6 months)", "18 (1 year)", "20 (2 years)", "22 (3-4 years)", "24 (4-6 years)",
  "26 (6-7 years)", "28 (7-8 years)", "30 (9 years)", "32 (10 years)", "34 (11-12 years)"
];

const LOCAL_STORAGE_KEY = "jerseyOrders";

const OrderForm = () => {
  const [formData, setFormData] = useState({
    PersonName: "",
    JerseyNumber: "",
    Size: "",
    Neck: "",
    Sleeves: "",
  });

  const [lastSelectedNeck, setLastSelectedNeck] = useState("");
  const [lastSelectedSleeves, setLastSelectedSleeves] = useState("");

  const [orderedPersons, setOrderedPersons] = useState(() => {
    const storedOrders = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedOrders ? JSON.parse(storedOrders) : [];
  });

  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);
  const [clearDialogContent, setClearDialogContent] = useState("");
  const [clearDialogTitle, setClearDialogTitle] = useState("");
  const [clearConfirmAction, setClearConfirmAction] = useState(() => {});
  const [editingIndex, setEditingIndex] = useState(null);

  const [isFormHidden, setIsFormHidden] = useState(false);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(orderedPersons));
  }, [orderedPersons]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (value, type) => {
    if (type === "Neck") setLastSelectedNeck(value);
    if (type === "Sleeves") setLastSelectedSleeves(value);

    setFormData((prevData) => ({
      ...prevData,
      [type]: value,
    }));
  };

  const handleAddPerson = (e) => {
    e.preventDefault();
    let { PersonName, JerseyNumber, Size, Neck, Sleeves } = formData;

    if (!Neck && lastSelectedNeck) Neck = lastSelectedNeck;
    if (!Sleeves && lastSelectedSleeves) Sleeves = lastSelectedSleeves;

    if (!PersonName || !JerseyNumber || !Size || !Neck || !Sleeves) {
      alert("Please fill in all the details.");
      return;
    }

    const newFormData = { PersonName, JerseyNumber, Size, Neck, Sleeves };

    if (editingIndex !== null) {
      const updated = [...orderedPersons];
      updated[editingIndex] = { ...newFormData };
      setOrderedPersons(updated);
      setEditingIndex(null);
    } else {
      setOrderedPersons((prev) => [...prev, { ...newFormData }]);
    }

    setFormData({
      PersonName: "",
      JerseyNumber: "",
      Size: "",
      Neck: "",
      Sleeves: "",
    });
  };

  const handleEditPerson = (index) => {
    const person = orderedPersons[index];
    setFormData(person);
    setEditingIndex(index);
    setLastSelectedNeck(person.Neck);
    setLastSelectedSleeves(person.Sleeves);
    setIsFormHidden(false); // Always show the form when editing
  };

  const handleDeletePerson = (index) => {
    setDeleteIndex(index);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeletePerson = () => {
    const updated = [...orderedPersons];
    updated.splice(deleteIndex, 1);
    setOrderedPersons(updated);
    setIsDeleteDialogOpen(false);
    setDeleteIndex(null);
  };

  const cancelDeletePerson = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleClearAllData = () => {
    setClearDialogTitle("Clear All Orders?");
    setClearDialogContent(
      "Are you sure you want to clear all the stored jersey orders? This action cannot be undone."
    );
    setClearConfirmAction(() => confirmClearAllData);
    setIsClearDialogOpen(true);
  };

  const confirmClearAllData = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setOrderedPersons([]);
    setIsClearDialogOpen(false);
  };

  const cancelClearAllData = () => {
    setIsClearDialogOpen(false);
  };

  return (
    <div className="flex flex-col p-4 gap-3 overflow-y-auto w-full">
      
      {/* Switch to show/hide form */}
      <div className="flex justify-center gap-3 mb-1">
        <Switch 
          color="primary" 
          checked={!isFormHidden}
          onChange={() => setIsFormHidden((prev) => !prev)}
        />
          <Typography as="label" htmlFor="hide-form-switch" className="cursor-pointer text-black">
          {!isFormHidden ? "Show Form" : "Hide Form"}
        </Typography>
      </div>

      {!isFormHidden && (
        <Card className="mt-2 w-full h-1/2">
          <CardHeader color="blue-gray" className="p-4">
            <Typography variant="h5" color="white">
              Order Your Custom Jersey
            </Typography>
          </CardHeader>
          <CardBody className="p-2">
            <div className="flex flex-wrap gap-4 justify-around">
              <div className="w-48">
                <Input
                  label="Person Name"
                  name="PersonName"
                  value={formData.PersonName}
                  onChange={handleChange}
                  placeholder="Enter name"
                />
              </div>
              <div className="w-48">
                <Input
                  type="number"
                  label="Jersey Number"
                  name="JerseyNumber"
                  value={formData.JerseyNumber}
                  onChange={handleChange}
                  placeholder="Enter number"
                />
              </div>
              <div className="w-48">
                <Select
                  label="Neck Type"
                  value={formData.Neck || lastSelectedNeck}
                  onValueChange={(val) => handleSelectChange(val, "Neck")}
                >
                  <Select.Trigger placeholder="Select Neck" />
                  <Select.List>
                    {NeckOptions.map((option) => (
                      <Select.Option key={option} value={option}>
                        {option}
                      </Select.Option>
                    ))}
                  </Select.List>
                </Select>
              </div>
              <div className="w-48">
                <Select
                  label="Sleeve Type"
                  value={formData.Sleeves || lastSelectedSleeves}
                  onValueChange={(val) => handleSelectChange(val, "Sleeves")}
                >
                  <Select.Trigger placeholder="Select Sleeves" />
                  <Select.List>
                    {SleeveOptions.map((option) => (
                      <Select.Option key={option} value={option}>
                        {option}
                      </Select.Option>
                    ))}
                  </Select.List>
                </Select>
              </div>
              <div className="w-48">
                <Select
                  label="Size"
                  value={formData.Size}
                  onValueChange={(val) => handleSelectChange(val, "Size")}
                >
                  <Select.Trigger placeholder="Select Size" />
                  <Select.List>
                    {SizeOptions.map((option) => (
                      <Select.Option key={option} value={option}>
                        {option}
                      </Select.Option>
                    ))}
                  </Select.List>
                </Select>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <Button onClick={handleAddPerson} color="success">
                {editingIndex !== null ? "Update Order" : "Add Order"}
              </Button>
              <Button onClick={handleClearAllData} color="error">
                Clear All Data
              </Button>
            </div>
          </CardBody>
        </Card>
      )}

      <div className="overflow-y-auto h-screen p-4 w-full">
        {orderedPersons.length === 0 ? (
          <Typography variant="small" className="text-gray-600">
            No orders added yet.
          </Typography>
        ) : (
          <div className="p-4">
            <JerseyOrdersTable
              data={orderedPersons}
              onEdit={handleEditPerson}
              onDelete={handleDeletePerson}
            />
          </div>
        )}
      </div>

      {/* Clear All Orders Dialog */}
      <CommonDialog
        open={isClearDialogOpen}
        title={clearDialogTitle}
        content={clearDialogContent}
        onConfirm={clearConfirmAction}
        onCancel={cancelClearAllData}
      />

      {/* Delete Person Dialog */}
      <CommonDialog
        open={isDeleteDialogOpen}
        title="Delete this order?"
        content="Are you sure you want to delete this order?"
        onConfirm={confirmDeletePerson}
        onCancel={cancelDeletePerson}
      />
    </div>
  );
};

export default OrderForm;

import { collection, addDoc, getDocs } from "firebase/firestore";

// Template states
const [templateTitle, setTemplateTitle] = useState("");
const [templateMessage, setTemplateMessage] = useState("");
const [templates, setTemplates] = useState([]);

const addTemplate = async () => {
  if (!templateTitle || !templateMessage) {
    alert("Please fill both fields");
    return;
  }

  try {
    await addDoc(collection(db, "templates", user.uid, "list"), {
      title: templateTitle,
      message: templateMessage,
    });
    alert("✅ Template Saved!");
    setTemplateTitle("");
    setTemplateMessage("");
    fetchTemplates();
  } catch (e) {
    console.error("Error saving template", e);
  }
};

const fetchTemplates = async () => {
  const querySnapshot = await getDocs(collection(db, "templates", user.uid, "list"));
  const tempList = [];
  querySnapshot.forEach((doc) => {
    tempList.push(doc.data());
  });
  setTemplates(tempList);
};

useEffect(() => {
  if (user) {
    fetchStudents();
    fetchTemplates();
  }
}, [user]);

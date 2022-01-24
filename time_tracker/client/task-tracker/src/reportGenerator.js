import jsPDF from "jspdf";
import "jspdf-autotable";
import { format } from "date-fns";

const generatePDF = tasks => {
  const doc = new jsPDF();

  const tableColumn = ["Task Name", "Start Date", "Finish Date", "Duration"];

  const tableRows=[];

  tasks.forEach(task => {
    const taskData = [
      task.taskName,
      task.start,
      task.finish,
      task.duration

    ];
    tableRows.push(taskData);
  });

  doc.autoTable(tableColumn, tableRows, {startY: 20});
  const date = new Date()

  doc.text("Closed tasks.", 14, 15);
  doc.save(`report_${date}.pdf`);
};

export default generatePDF;

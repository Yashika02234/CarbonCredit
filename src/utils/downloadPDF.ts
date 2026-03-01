import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ReactDOMServer from "react-dom/server";
import React from "react";

export const downloadPDF = async (
  component: JSX.Element,
  filename: string
) => {
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.left = "-9999px";
  document.body.appendChild(container);

  container.innerHTML = ReactDOMServer.renderToString(component);

  const canvas = await html2canvas(container.firstChild as HTMLElement, {
    scale: 2,
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  pdf.addImage(
    imgData,
    "PNG",
    0,
    0,
    pdf.internal.pageSize.getWidth(),
    pdf.internal.pageSize.getHeight()
  );

  pdf.save(filename);
  document.body.removeChild(container);
};

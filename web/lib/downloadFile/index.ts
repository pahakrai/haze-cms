export const downloadFile = (url: string) => {
  const formatUrl = url || "";
  const filename = formatUrl
    .substring(formatUrl.lastIndexOf("/") + 1)
    .replace(/\?.+/, "");
  const element = document.createElement("a");

  element.setAttribute("target", "_blank");
  element.setAttribute("href", url);
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();
  document.body.removeChild(element);
};

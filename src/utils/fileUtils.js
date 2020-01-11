export const removeFileExtension = (fileName) => {
  return fileName.replace('.wav', '')
}

export const getSounctiveFileName = (fileName) => {
  let extensionLessFileName = removeFileExtension(fileName);
  return extensionLessFileName + " from Sounctive.wav";
}
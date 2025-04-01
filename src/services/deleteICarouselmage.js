import { deleteDoc } from "firebase/firestore";

export const deleteCarouselImage = async (imageId) => {
  try {
    await deleteDoc(doc(db, "Carousel Images", imageId));
    setImages(images.filter((img) => img.id !== imageId));
  } catch (error) {
    console.error("Error deleting image:", error);
  }
};
import { useState } from "react";

const AddProductPage = () => {
  const [image, setImage] = useState("");

  const imgbbUpload = async (file) => {
    const apiKey = import.meta.env.VITE_IMGBB_API;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=" + apiKey,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const file = form.img.files[0];

  if (!file) {
    console.error('No file selected');
    return;
  }

  await imgbbUpload(file)
    .then((response) => {
    //   console.log(response);
      setImage(response.data.display_url);
    })
    .catch((error) => console.error('Upload failed:', error));

    const product = {
      name: form.name.value,
      price: form.price.value,
      category: form.category.value,
      description: form.description.value,
      rating: form.rating.value,
      image: image,
      createdAt: new Date().toISOString(),
    };
    console.log(product)
  };
  return (
    <div className="flex">
      <h1 className="w-4/12 bg-red-50 p-4">Add Products</h1>
      <form className="w-8/12 p-4" onSubmit={handleSubmit}>
        <div className="w-full">
          <label>
            Product Name:
            <input
              className="p-2 border rounded-lg block mb-4 w-full"
              type="text"
              name="name"
              placeholder="Write Product Name"
            />
          </label>
        </div>

        <div className="flex gap-4 flex-col justify-between lg:flex-row">
          <div>
            <label>
              Product Price:
              <input
                className="p-2 border rounded-lg block mb-4 w-full"
                type="number"
                name="price"
                placeholder="$ Product Price"
              />
            </label>
          </div>

          <div>
            <label>
              Product Category:
              <input
                className="p-2 border rounded-lg block mb-4 w-full"
                type="text"
                name="category"
                placeholder="Product category"
              />
            </label>
          </div>

          <div>
            <label>
              Product Rating:
              <input
                className="p-2 border rounded-lg block mb-4 w-full"
                min={0}
                max={5}
                type="number"
                name="rating"
                placeholder="Product Rating"
              />
            </label>
          </div>
        </div>

        <div>
          <label>
            Product Description:
            <textarea
              className="p-2 border rounded-lg block mb-4 w-full h-28"
              type="text"
              name="description"
              placeholder="Product description"
            />
          </label>
        </div>

        <div>
          <label>
            Product Image:
            <input
              type="file"
              name="img"
              className="file-input file-input-bordered w-full max-w-xs block mb-4"
            />
          </label>
        </div>

        <input
          className="btn btn-block btn-accent btn-outline"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default AddProductPage;

export const handleResponse = (response) => {
  if (response.data.status === "success") {
    return response.data.data;
  }
  throw new Error(response.data.message || "Request failed");
};

export const handleError = (error) => {
  if (error.response) {
    const errorMessage =
      error.response.data?.message ||
      `HTTP error! status: ${error.response.status}`;
    throw new Error(errorMessage);
  } else if (error.request) {
    throw new Error("No response received from the server");
  } else {
    throw new Error(`Request setup error: ${error.message}`);
  }
};

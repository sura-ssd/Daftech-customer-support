
const formatDateTime = (timestamp) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
  
    return new Date(timestamp).toLocaleDateString(undefined, options);
  };
  
  export default formatDateTime;
  
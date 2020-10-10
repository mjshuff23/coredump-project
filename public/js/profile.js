const handleDelete = (userId) => {
    return async () => {
      try {
        const res = await fetch(`/users/${userId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "COREDUMP_ACCESS_TOKEN"
            )}`,
          },
        });
        if (!res.ok) {
          throw res;
        }
      } catch (err) {
        console.error(err);
      }
    };
  };

  document.addEventListener("DOMContentLoaded", async () => {
    const userId = localStorage.getItem("COREDUMP_CURRENT_USER_ID");
    try {
      const res = await fetch(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "COREDUMP_ACCESS_TOKEN"
          )}`,
        },
      });
      if (res.status === 401) {
        window.location.href = "/log-in";
        return;
      }
  
    const deleteButton = document.querySelectorAll(".userDelete-button");
     
    deleteButton.addEventListener("click", handleDelete());
       
      
    } catch (err) {
      console.error(err);
    }
  });
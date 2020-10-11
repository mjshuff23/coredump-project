const handleDelete = (userId) => {
    return async () => {
        
      try {
        const res = await fetch(`/users/${$user.id}/delete`, {
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
        window.location.href = "/main";
      } catch (err) {
        console.error(err);
      }

      try {
        const res = await fetch("/users/logout", {
            method: "POST",
        });
        if (!res.ok) {
            throw res;
        }

        localStorage.removeItem("COREDUMP_CURRENT_USER_ID");
        localStorage.removeItem("COREDUMP_ACCESS_TOKEN");
        window.location.href = "/login";

    }
    catch (err) {
        console.log(await err.json());
        // handleErrors(err);
    }
    };
  };

  document.addEventListener("DOMContentLoaded", async () => {
    const userId = localStorage.getItem("COREDUMP_CURRENT_USER_ID");
    try {
      const res = await fetch(`/users/${userId}/delete`, {
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
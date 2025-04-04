const createHandler = () => {
  document.getElementById("noIfo").style.display = "none";
  document.getElementById("formDetails").style.display = "block";
  document.getElementById("createBtn").style.display = "none";
  document.getElementById("readBtn").style.display = "none";
  document.getElementById("refreshBtn").style.display = "block";
};

document
  .getElementById("formDetails")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const gender = document.getElementById("gender").value;
    const age = document.getElementById("age").value;
    const address = document.getElementById("address").value;
    const country = document.getElementById("country").value;

    //send the response to server
    try {
      const response = await fetch("http://127.0.0:4500/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          gender,
          age,
          address,
          country,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        alert(data.message);

        document.getElementById("formDetails").style.display = "none";
        document.getElementById("refreshBtn").style.display = "none";
        document.getElementById("readBtn").style.display = "block";
        document.getElementById("noIfo").style.display = "block";
        document.getElementById("heading").style.display = "none";
        document.getElementById("viewHeading").style.display = "block";
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert("Something went wrong, try again!");
    }

    this.reset();
  });

const userDetails = () => {
  document.getElementById("noIfo").style.display = "none";
  document.getElementById("readBtn").style.display = "none";
  document.getElementById("viewDetails").style.display = "block";
  document.getElementById("createBtn").style.display = "none";
  document.getElementById("homepageBtn").style.display = "block";
};

document.getElementById("viewDetails").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("viewEmail").value;
  if (!email) {
    alert("Please enter an email!");
  }
  try {
    const response = await fetch(`http://127.0.0:4500/form/${email}`);
    const data = await response.json();

    if (response.ok) {
      document.getElementById("userDetails").innerHTML = `
          <p>User Details</p>
          <div style="border: 1px dashed brown;">
            <p style="border-bottom: 1px dashed brown; padding: 4px;"><strong>First Name</strong>: ${data.firstname}</p>
            <p style="border-bottom: 1px dashed brown; padding: 4px;"><strong>Last Name</strong>: ${data.lastname}</p>
            <p style="border-bottom: 1px dashed brown; padding: 4px;"><strong>Email</strong>: ${data.email}</p>
            <p style="border-bottom: 1px dashed brown; padding: 4px;"><strong>Gender</strong>: ${data.gender}</p>
            <p style="border-bottom: 1px dashed brown; padding: 4px;"><strong>Age</strong>: ${data.age}</p>
            <p style="border-bottom: 1px dashed brown; padding: 4px;"><strong>Address</strong>: ${data.address}</p>
            <p style="border-bottom: 1px dashed brown; padding: 4px;"><strong>Country</strong>: ${data.country}</p>
          </div>
        `;

      document.getElementById("editBtn").style.display = "inline";
      document.getElementById("deleteBtn").style.display = "inline";
    } else {
      document.getElementById(
        "userDetails"
      ).innerHTML = `<p style="color:red;">${data.error}</p>`;
    }
  } catch (error) {
    document.getElementById(
      "userDetails"
    ).innerHTML = `<p style="color:red;">Error fetching data</p>`;
  }

  document.getElementById("viewDetails").style.display = "none";
  document.getElementById("userDetailsWrap").style.display = "block";
  document.getElementById("homepageBtn").style.display = "block";
});

const updateHandler = () => {
  document.getElementById("deleteDetails").style.display = "none";
  document.getElementById("userDetailsWrap").style.display = "none";
  document.getElementById("deleteBtn").style.display = "none";
  document.getElementById("editBtn").style.display = "none";
  document.getElementById("updateDetails").style.display = "block";
};

document
  .getElementById("updateDetails")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("updateEmail").value;
    console.log(email);

    document.getElementById("addressUpdate").style.display = "block";
    document.getElementById("updateDetails").style.display = "none";

    document
      .getElementById("addressUpdate")
      .addEventListener("submit", async (e) => {
        e.preventDefault();

        const updateAddress = document.getElementById("updateAddress").value;
        console.log(updateAddress);

        try {
          const response = await fetch(`http://127.0.0:4500/form/${email}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ updateAddress }),
          });

          const result = await response.json();

          if (response.ok) {
            alert(result.message);

            const response = await fetch(`http://127.0.0:4500/form/${email}`);
            const data = await response.json();

            document.getElementById("userDetails").innerHTML = `
              <p>User Details</p>
              <div style="border: 1px dashed brown;">
                <p style="border-bottom: 1px dashed brown; padding: 4px;"><strong>First Name</strong>: ${data.firstname}</p>
                <p style="border-bottom: 1px dashed brown; padding: 4px;"><strong>Last Name</strong>: ${data.lastname}</p>
                <p style="border-bottom: 1px dashed brown; padding: 4px;"><strong>Email</strong>: ${data.email}</p>
                <p style="border-bottom: 1px dashed brown; padding: 4px;"><strong>Gender</strong>: ${data.gender}</p>
                <p style="border-bottom: 1px dashed brown; padding: 4px;"><strong>Age</strong>: ${data.age}</p>
                <p style="border-bottom: 1px dashed brown; padding: 4px;"><strong>Address</strong>: ${data.address}</p>
                <p style="border-bottom: 1px dashed brown; padding: 4px;"><strong>Country</strong>: ${data.country}</p>
              </div>
            `;

            document.getElementById("userDetailsWrap").style.display = "block";
            document.getElementById("editBtn").style.display = "inline";
            document.getElementById("deleteBtn").style.display = "inline";
            document.getElementById("addressUpdate").style.display = "none";
          } else {
            alert(result.error);
          }
        } catch (error) {
          alert("Error updating data, try again!");
        }
      });
  });

const deleteHandler = () => {
  document.getElementById("deleteDetails").style.display = "block";
  document.getElementById("userDetailsWrap").style.display = "none";
  document.getElementById("deleteBtn").style.display = "none";
  document.getElementById("editBtn").style.display = "none";
};

document
  .getElementById("deleteDetails")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("deleteEmail").value;
    if (!email) {
      alert("Please enter an email!");
    }

    if (!confirm("Are you sure you want to delete your details?")) return;

    try {
      const response = await fetch(`http://127.0.0:4500/form/${email}`, {
        method: "DELETE",
      });

      const data = await response.json();
      ser;

      if (response.ok) {
        alert(data.message);

        document.getElementById("deleteDetails").style.display = "none";
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert("Failed to delete user details, try again!");
    }
  });

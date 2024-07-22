document.addEventListener("DOMContentLoaded", () => {
  const getInputs = () => {
    return {
      noOfQuestion: document.getElementById("noOfQuestion"),
      category: document.getElementById("category"),
      difficulty: document.getElementById("difficulty"),
      type: document.getElementById("type"),
    };
  };

  const getFormBtns = () => {
    return {
      nextBTN: document.getElementById("nextBTN"),
      resetBTN: document.getElementById("resetBTN"),
    };
  };

  const getContainers = () => {
    return {
      resultContainer: document.getElementById("resultContainer"),
      quizContainer: document.getElementById("quizContainer"),
      configContainer: document.getElementById("configContainer"),
    };
  };

  const API_BASE = "https://opentdb.com/api.php";

  const popUpMsg = ( msg, type = "alert") => {
    const alertContainer = document.getElementById("alertContainer")
    const messageElement = document.createElement("div");
  
    messageElement.className = type;
    messageElement.textContent = msg;
    alertContainer.appendChild(messageElement);
  
    setTimeout(() => {
      messageElement.style.display = "none";
      alertContainer.removeChild(messageElement);
    }, 2000);
  };

  const getQuestion = async ({
    amount = 10,
    category = 9,
    difficulty = "easy",
    type = "multiple",
  } = {}) => {
    try {
        console.log(amount,category,difficulty,type);
      const response = await fetch(
        `${API_BASE}?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      popUpMsg(`Error fetching questions: ${error}`, "alert");
    }
  };

  const isEmpty = (formInputs, containers) => {
    for (const key in formInputs) {
      const element = formInputs[key];
      if (!element.value) {
        popUpMsg(`Please Enter ${element.title}`, "alert");
        return true;
      }
    }
    return false;
  };

  const resetFormData = (formInputs, containers) => {
    for (const key in formInputs) {
      formInputs[key].value = "";
    }
    popUpMsg(`Cleared!`, "warning");
  };

  const onLoad = () => {
    const inputs = getInputs();
    const btns = getFormBtns();
    const containers = getContainers();

    if (btns.nextBTN) {
      btns.nextBTN.addEventListener("click", () => {
        if (!isEmpty(inputs, containers)) {
          getQuestion({
            amount: inputs.noOfQuestion.value,
            category: inputs.category.value,
            difficulty: inputs.difficulty.value.toLowerCase(),
            type: inputs.type.value,
          });
          popUpMsg(`Success!`, "success");
        }
      });
    } else {
      popUpMsg(`Next Button not found`, "alert");
    }

    if (btns.resetBTN) {
      btns.resetBTN.addEventListener("click", () =>
        resetFormData(inputs, containers)
      );
    } else {
      popUpMsg(`Reset Button not found`, "alert");
    }
  };

  onLoad();
});

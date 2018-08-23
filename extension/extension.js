console.log("extension loaded");
firebase.initializeApp(config);





const extension = {
    "setup": {
        "body": document.querySelector("body")
    },
    "functions": {
        init: function() {
            console.log("init");
            this.createDummyElement();
            this.createDashboard();
            this.createMenu();
            this.createTitleSection();
        },
        createDummyElement: function() {
            const dummyElement = document.createElement("div");
            dummyElement.classList.add("dummyElement");
            extension.setup.body.appendChild(dummyElement);
        },
        createDashboard: function() {
            const dashboard = document.createElement("div");
            dashboard.classList.add("dashboard");
            extension.setup.body.appendChild(dashboard);
        },
        createMenu: function() {
            this.createMenuContainer();
            this.createMenuItems();
        },
        createMenuContainer: function() {
            const dashboard = document.querySelector(".dashboard");
            const menuContainer = document.createElement("div");
            menuContainer.classList.add("menuContainer");
            dashboard.appendChild(menuContainer);
        },
        createMenuItems: function() {
            const menuContainer = document.querySelector(".menuContainer");
            const menuItemForTitle = document.createElement("div");
            const menuItemForChapters = document.createElement("div");
            menuItemForTitle.classList.add("menuItem", "menuItemTitle");
            menuItemForChapters.classList.add("menuItem", "menuItemChapter");
            menuItemForTitle.innerText = "Title";
            menuItemForChapters.innerText = "Chapters";
            menuContainer.appendChild(menuItemForTitle);
            menuContainer.appendChild(menuItemForChapters);
        },
        createTitleSection: function() {
            this.createTitleSectionContainer();
            this.createTitleSectionHeading();
            this.createTitleSectionSelector();
            this.createTitleSectionHtmlTextarea();
            this.createTitleSectionDisplay();
        },
        createTitleSectionContainer: function() {
            const dashboard = document.querySelector(".dashboard");
            const titleSectionContainer = document.createElement("div");
            titleSectionContainer.classList.add("titleSectionContainer");
            dashboard.appendChild(titleSectionContainer);
        },
        createTitleSectionHeading: function() {
            const titleSectionContainer = document.querySelector(".titleSectionContainer");
            const titleSectionHeading = document.createElement("div");
            titleSectionHeading.classList.add("titleSectionHeading");
            titleSectionHeading.innerText = "Title Section";
            titleSectionContainer.appendChild(titleSectionHeading);
        },
        createTitleSectionSelector: function() {
            this.createTitleSectionSelectorContainer();
            this.createTitleSectionSelectorInput();
            this.createTitleSectionSelectorButton();
            this.addTitleSectionSelectorCopyFunctionality();
        },
        createTitleSectionSelectorContainer: function() {
            const titleSectionContainer = document.querySelector(".titleSectionContainer");
            const titleSectionSelectorContainer = document.createElement("div");
            titleSectionSelectorContainer.classList.add("titleSectionSelectorContainer");
            titleSectionContainer.appendChild(titleSectionSelectorContainer);
        },
        createTitleSectionSelectorInput: function() {
            const titleSectionSelectorContainer = document.querySelector(".titleSectionSelectorContainer");
            const titleSelector = document.createElement("input");
            titleSelector.setAttribute("id", "titleSelector");
            titleSelector.setAttribute("type", "text");
            // Important line as this contains the code to be copied to devTools
            titleSelector.setAttribute("value", 'document.querySelector("#top-detail").children[0].children[0];');
            titleSectionSelectorContainer.appendChild(titleSelector);
        },
        createTitleSectionSelectorButton: function() {
            const titleSectionSelectorContainer = document.querySelector(".titleSectionSelectorContainer");
            const titleSelectorBtn = document.createElement("button");
            titleSelectorBtn.setAttribute("id", "titleSelectorBtn");
            titleSelectorBtn.innerText = "Copy";
            titleSectionSelectorContainer.appendChild(titleSelectorBtn);
        },
        createTitleSectionHtmlTextarea: function() {
            this.createTitleSectionHtmlTextareaContainer();
            this.createTitleSectionHtmlTextareaInput();
            this.createTitleSectionHtmlTextareaButton();
        },
        createTitleSectionHtmlTextareaContainer: function() {
            const titleSectionContainer = document.querySelector(".titleSectionContainer");
            const titleSelectorCopyContainer = document.createElement("div");
            titleSelectorCopyContainer.classList.add("titleSelectorCopyContainer");
            titleSectionContainer.appendChild(titleSelectorCopyContainer);
        },
        createTitleSectionHtmlTextareaInput: function() {
            const titleSelectorCopyContainer = document.querySelector(".titleSelectorCopyContainer");
            const titleSelectorCopyTextarea = document.createElement("textarea");
            titleSelectorCopyTextarea.classList.add("titleSelectorCopyTextarea");
            titleSelectorCopyContainer.appendChild(titleSelectorCopyTextarea);
        },
        createTitleSectionHtmlTextareaButton: function() {
            const titleSelectorCopyContainer = document.querySelector(".titleSelectorCopyContainer");
            const titleSelectorCopyTextareaBtn = document.createElement("button");
            titleSelectorCopyTextareaBtn.setAttribute("id", "titleSelectorCopyTextareaBtn");
            titleSelectorCopyTextareaBtn.innerText = "Parse";
            titleSelectorCopyContainer.appendChild(titleSelectorCopyTextareaBtn);
        },
        createTitleSectionDisplay: function() {
            this.createTitleSectionTitleDisplayContainer();
            this.createTitleSectionHrefDisplayContainer();
            this.createTitleSectionDbSubmitButton();
            this.addTitleSectionHtmlParseFunctionality();
        },
        createTitleSectionTitleDisplayContainer: function() {
            const titleSectionContainer = document.querySelector(".titleSectionContainer");
            const courseTitleContainer = document.createElement("div");
            courseTitleContainer.classList.add("courseTitleContainer");
            titleSectionContainer.appendChild(courseTitleContainer);
        },
        createTitleSectionHrefDisplayContainer: function() {
            const titleSectionContainer = document.querySelector(".titleSectionContainer");
            const courseHrefIdContainer = document.createElement("div");
            courseHrefIdContainer.classList.add("courseHrefIdContainer");
            titleSectionContainer.appendChild(courseHrefIdContainer);
        },
        createTitleSectionDbSubmitButton: function() {
            const titleSectionContainer = document.querySelector(".titleSectionContainer");
            const submitToDbBtn = document.createElement("button");
            submitToDbBtn.setAttribute("id", "submitToDbBtn");
            submitToDbBtn.classList.add("hidden");
            submitToDbBtn.innerText = "Correct?";
            titleSectionContainer.appendChild(submitToDbBtn);
        },
        addTitleSectionSelectorCopyFunctionality: function() {
            const titleSelectorBtn = document.querySelector("#titleSelectorBtn");
            titleSelectorBtn.addEventListener("click", copyTitleSelector);

            function copyTitleSelector() {
                const titleSelector = document.getElementById("titleSelector");
                titleSelector.select();
                document.execCommand("copy");
                titleSelectorBtn.innerText = "Copied!";
            }
        },
        addTitleSectionHtmlParseFunctionality: function() {
            const titleSelectorCopyTextareaBtn = document.querySelector("#titleSelectorCopyTextareaBtn");
            const courseTitleContainer = document.querySelector(".courseTitleContainer");
            const courseHrefIdContainer = document.querySelector(".courseHrefIdContainer");
            titleSelectorCopyTextareaBtn.addEventListener("click", parseHTML);

            function parseHTML() {
                const submitToDbBtn = document.querySelector("#submitToDbBtn");
                const input = document.querySelector(".titleSelectorCopyTextarea").value;
                const dummyElement = document.querySelector(".dummyElement");
                dummyElement.innerHTML = input;

                const courseTitle = dummyElement.children[0].innerText;
                const courseId = dummyElement.children[0].href.split("/")[3];

                courseTitleContainer.innerText = courseTitle;
                courseHrefIdContainer.innerText = courseId;
                submitToDbBtn.classList.remove("hidden");
                titleSelectorCopyTextareaBtn.innerText = "Parsed!";

                extension.database.addCourse(courseTitle, courseId);
            }
        }
    },
    "database": {
        addCourse: function(title, href) {
            const submitToDbBtn = document.querySelector("#submitToDbBtn");
            submitToDbBtn.addEventListener("click", () => {
                this.checkCourses(title, href);
            });
        },
        checkCourses: function(title, href) {
            const database = firebase.database().ref("testsite/courses");
            database.once("value").then(snapshot => {
                const coursesObj = snapshot.val();
                if (coursesObj === null) {
                    this.submitTitle(title, href, "course_1");
                } else {
                    let validationArray = this.generateCourseNum(coursesObj, href);
                    let valid = validationArray[0];
                    let courseNum = validationArray[1];
                    if (valid) {
                        this.submitTitle(title, href, courseNum);
                    }
                }
            });
        },
        generateCourseNum: function(coursesObj, href) {
            const coursesArray = Object.keys(coursesObj);
            let validationArray = [true];
            coursesArray.forEach(course => {
                if (coursesObj[course].id === href) {
                    console.log("course already exists");
                    validationArray[0] = false;
                    validationArray.push(course);
                }
            });
            if (validationArray[0]) {
                validationArray.push("course_" + (validationArray.length + 1));
                console.log("valid - new course");
                return validationArray;
            } else {
                console.log("not valid - no new course");
                return validationArray;
            }
        },
        submitTitle: function(title, href, courseNum) {
            console.log("added stuff to db");
            const submitToDbBtn = document.querySelector("#submitToDbBtn");
            submitToDbBtn.innerText = "Submitted!";
            firebase.database().ref(`testsite/courses/${courseNum}`).set({
                title: title,
                id: href,
            });
        }
    }
}








extension.functions.init();



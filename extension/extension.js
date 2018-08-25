console.log("extension loaded");
firebase.initializeApp(config);


const database = firebase.database().ref("courses");
database.once("value").then(snapshot => {
    console.log("in firebase");
    let dbObj = snapshot.val();
    let dbObjString = JSON.stringify(dbObj);
    localStorage.setItem("dbObj", dbObjString);
});

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
            this.createChaptersSection();
            this.checkUrlForTitleOrChapters();
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
            extension.database.addCheckCourseDetailsInMenuFunctionality();
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
            menuItemForChapters.classList.add("menuItem", "menuItemChapters");
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
        createChaptersSection: function() {
            this.createChaptersSectionContainer();
            this.createChaptersSectionHeading();
            this.createChaptersSectionSelector();
            this.createChaptersSectionHtmlTextarea();
            
        },
        createChaptersSectionContainer: function() {
            const dashboard = document.querySelector(".dashboard");
            const chaptersSectionContainer = document.createElement("div");
            chaptersSectionContainer.classList.add("chaptersSectionContainer");
            dashboard.appendChild(chaptersSectionContainer);
        },
        createChaptersSectionHeading: function() {
            const chaptersSectionContainer = document.querySelector(".chaptersSectionContainer");
            const chaptersSectionHeading = document.createElement("div");
            chaptersSectionHeading.classList.add("chaptersSectionHeading");
            chaptersSectionHeading.innerText = "Chapters Section";
            chaptersSectionContainer.appendChild(chaptersSectionHeading);
        },
        createChaptersSectionSelector: function() {
            this.createChaptersSectionSelectorContainer();
            this.createChaptersSectionSelectorInput();
            this.createChaptersSectionSelectorButton();
            this.addChaptersSectionSelectorCopyFunctionality();
        },
        createChaptersSectionSelectorContainer: function() {
            const chaptersSectionContainer = document.querySelector(".chaptersSectionContainer");
            const chaptersSectionSelectorContainer = document.createElement("div");
            chaptersSectionSelectorContainer.classList.add("chaptersSectionSelectorContainer");
            chaptersSectionContainer.appendChild(chaptersSectionSelectorContainer);
        },
        createChaptersSectionSelectorInput: function() {
            const chaptersSectionSelectorContainer = document.querySelector(".chaptersSectionSelectorContainer");
            const chaptersSelector = document.createElement("input");
            chaptersSelector.setAttribute("id", "chaptersSelector");
            chaptersSelector.setAttribute("type", "text");
            // Important line as this contains the code to be copied to devTools
            chaptersSelector.setAttribute("value", 'document.querySelector("div[role=tablist]");');
            chaptersSectionSelectorContainer.appendChild(chaptersSelector);
        },
        createChaptersSectionSelectorButton: function() {
            const chaptersSectionSelectorContainer = document.querySelector(".chaptersSectionSelectorContainer");
            const chaptersSelectorBtn = document.createElement("button");
            chaptersSelectorBtn.setAttribute("id", "chaptersSelectorBtn");
            chaptersSelectorBtn.innerText = "Copy";
            chaptersSectionSelectorContainer.appendChild(chaptersSelectorBtn);
        },
        createChaptersSectionHtmlTextarea: function() {
            this.createChaptersSectionHtmlTextareaContainer();
            this.createChaptersSectionHtmlTextareaInput();
            this.createChaptersSectionHtmlTextareaButton();
            this.addChaptersSectionHtmlParseFunctionality();
        },
        createChaptersSectionHtmlTextareaContainer: function() {
            const chaptersSectionContainer = document.querySelector(".chaptersSectionContainer");
            const chaptersSelectorCopyContainer = document.createElement("div");
            chaptersSelectorCopyContainer.classList.add("chaptersSelectorCopyContainer");
            chaptersSectionContainer.appendChild(chaptersSelectorCopyContainer);
        },
        createChaptersSectionHtmlTextareaInput: function() {
            const chaptersSelectorCopyContainer = document.querySelector(".chaptersSelectorCopyContainer");
            const chaptersSelectorCopyTextarea = document.createElement("textarea");
            chaptersSelectorCopyTextarea.classList.add("chaptersSelectorCopyTextarea");
            chaptersSelectorCopyContainer.appendChild(chaptersSelectorCopyTextarea);
        },
        createChaptersSectionHtmlTextareaButton: function() {
            const chaptersSelectorCopyContainer = document.querySelector(".chaptersSelectorCopyContainer");
            const chaptersSelectorCopyTextareaBtn = document.createElement("button");
            chaptersSelectorCopyTextareaBtn.setAttribute("id", "chaptersSelectorCopyTextareaBtn");
            chaptersSelectorCopyTextareaBtn.innerText = "Parse";
            chaptersSelectorCopyContainer.appendChild(chaptersSelectorCopyTextareaBtn);
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
        },
        addChaptersSectionSelectorCopyFunctionality: function() {
            const chaptersSelectorBtn = document.querySelector("#chaptersSelectorBtn");
            chaptersSelectorBtn.addEventListener("click", copyChaptersSelector);
            
            function copyChaptersSelector() {
                const chaptersSelector = document.getElementById("chaptersSelector");
                chaptersSelector.select();
                document.execCommand("copy");
                chaptersSelectorBtn.innerText = "Copied!";
            }
        },
        addChaptersSectionHtmlParseFunctionality: function() {
            const chaptersSelectorCopyTextareaBtn = document.querySelector("#chaptersSelectorCopyTextareaBtn");
            chaptersSelectorCopyTextareaBtn.addEventListener("click", parseHTML);
            
            let currentCourse = extension.database.getCurrentCourse();
            
            function parseHTML() {
                //const submitToDbBtn = document.querySelector("#submitToDbBtn");
                let input = document.querySelector(".chaptersSelectorCopyTextarea").value;
                const dummyElement = document.querySelector(".dummyElement");
                dummyElement.innerHTML = input;
                let tabList = document.querySelectorAll(".dummyElement div[role=tab]");
                
                tabList.forEach(item => {
                    let sectionNum = item.children[0].innerText.split(" ")[1];
                    let sectionTitle = item.children[2].innerText;
                    
                    extension.database.addCourseSection(currentCourse, sectionNum, sectionTitle);
                    console.log(`${sectionNum} || ${sectionTitle}`);
                    console.log("");
                });
                
                // This is the section list (each element is a section and contains a grouping of chapters)
                let sectionList = document.querySelectorAll(".dummyElement .panel-body > ul");
                let sectionNumber = 0;
                
                sectionList.forEach(section => {
                    let sectionItems = section.children;
                    sectionNumber++;
                    console.log(sectionNumber);
                    
                    for (let i = 0; i < sectionItems.length; i++) {
                        let chapterType = sectionItems[i].children[0].children[0].children[0].getAttribute("class").split("-")[1];
                        let chapterTitleNodes = sectionItems[i].children[0].children[1].childNodes;
                        let chapterTitleTextArray = [];
                        
                        chapterTitleNodes.forEach(node => {
                            if (node.nodeName === "#text") {
                                chapterTitleTextArray.push(node.nodeValue);
                            }
                        });
                        let chapterNumber = chapterTitleTextArray[0].split(".")[0];
                        let chapterTitle = chapterTitleTextArray[2];
                        let chapterDuration = sectionItems[i].children[0].children[2].innerText;
                        extension.database.addCourseChapter(currentCourse, sectionNumber, chapterNumber, chapterTitle, chapterType, chapterDuration);
                        console.log(`${chapterNumber} || ${chapterTitle} || ${chapterType} || ${chapterDuration}`);
                    }
                    console.log("----- |||||| -----")
                    console.log("");
                });
                
                chaptersSelectorCopyTextareaBtn.innerText = "Parsed!";
            }
        },
        checkUrlForTitleOrChapters: function() {
            const titleSectionContainer = document.querySelector(".titleSectionContainer");
            const chaptersSectionContainer = document.querySelector(".chaptersSectionContainer");
            let url = window.location.pathname.split("/")[4];
            console.log(url);
            if (url === "overview") {
                if (titleSectionContainer.classList.contains("hidden")) {
                    titleSectionContainer.classList.remove("hidden");
                }
            } else {
                titleSectionContainer.classList.add("hidden");
            }
            if (url === "content") {
                if (chaptersSectionContainer.classList.contains("hidden")) {
                    chaptersSectionContainer.classList.remove("hidden");
                }
            } else {
                chaptersSectionContainer.classList.add("hidden");
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
            const database = firebase.database().ref("courses");
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
                // console.log("valid - new course");
                return validationArray;
            } else {
                // console.log("not valid - no new course");
                return validationArray;
            }
        },
        submitTitle: function(title, href, courseNum) {
            console.log("added stuff to db");
            const submitToDbBtn = document.querySelector("#submitToDbBtn");
            submitToDbBtn.innerText = "Submitted!";
            firebase.database().ref(`courses/${courseNum}`).set({
                title: title,
                id: href,
            });
        },
        addCheckCourseDetailsInMenuFunctionality: function() {
            const menuItemForTitle = document.querySelector(".menuItemTitle");
            const menuItemForChapters = document.querySelector(".menuItemChapters");
            
            const database = firebase.database().ref("courses");
            database.on("value", snapshot => {
                const coursesObj = snapshot.val();
                const href = window.location.pathname.split("/")[1];
                
                if (coursesObj === null) {
                    menuItemForTitle.classList.add("notInDb");
                    //menuItemForChapters.classList.add("notInDb");
                } else {
                    let validationArray = this.generateCourseNum(coursesObj, href);
                    let valid = validationArray[0];
                    if (valid) {
                        menuItemForTitle.classList.add("notInDb");
                    } else {
                        menuItemForTitle.classList.add("inDb");
                    }
                }
            });
        },
        getCurrentCourse: function() {
            let href = window.location.pathname.split("/")[1];
            let dbObj = localStorage.getItem("dbObj");
            console.log(dbObj);
            let coursesObj = JSON.parse(dbObj);
            console.log(coursesObj);
            let coursesArray = Object.keys(coursesObj);
            console.log(coursesArray);
            let currentCourse = [];
            coursesArray.forEach(course => {
                console.log("inside foreach");
                console.log(coursesObj);
                console.log(course);
                console.log(coursesObj[course].id);
                if (coursesObj[course].id === href) {
                    currentCourse.push(course);
                }
            });
            console.log(currentCourse);
            console.log(currentCourse[0]);
            return currentCourse[0];
        },
        addCourseSection: function(course, num, title) {
            let courseNum = course.split("_")[1];
            let section = `section_${courseNum}-${num}`;
            firebase.database().ref(`courses/${course}/${section}`).set({
                title: title,
            });
        },
        addCourseChapter: function(course, sectionNum, chapterNum, title, type, duration) {
            let courseNum = course.split("_")[1];
            let section = `section_${courseNum}-${sectionNum}`;
            let chapter = `chapter_${courseNum}-${sectionNum}-${chapterNum}`;
            if (type === "play") {
                type = "video";
            }
            firebase.database().ref(`courses/${course}/${section}/${chapter}`).set({
                title: title,
                type: type,
                duration: duration
            });
        }
    }
}

// Initializing extension functionality
//extension.functions.init();

function initializeExtension() {
    console.log("Starting app");
    const timeoutHandle = setTimeout(init, 3000);
}

function init() {
    console.log("After 3 seconds");
    console.log(JSON.parse(localStorage.getItem("dbObj")));
    console.log("ready to initialize extension?");
    extension.functions.init();
}

initializeExtension();


/* Firebase */

// Initializing database
const database = firebase.database();

// Creating database references
const courses = firebase.database().ref('courses/');
const chapters = firebase.database().ref('chapters/');

// Listening database changes and storing data into local storage
courses.on('value', snapshot => {
    localStorage.setItem("courses", JSON.stringify(snapshot.val()));
});
chapters.on('value', snapshot => {
    localStorage.setItem("chapters", JSON.stringify(snapshot.val()));
});

// Getting data from local storage
const coursesObj = JSON.parse(localStorage.getItem("courses"));
const chaptersObj = JSON.parse(localStorage.getItem("chapters"));


const page = {
    "course": {
        "title": {
            createElement: function() {
                // Main element that's already written to the document manually
                const mainElement = document.querySelector("main");
                
                // Creating a container element for course title container and appending it to the main element
                const courseTitleContainer = document.createElement("div");
                mainElement.appendChild(courseTitleContainer);
                
                // Adding all the classes to the course title container element
                courseTitleContainer.classList.add("ui", "container", "center", "aligned", "margin-bottom-large");
                
                // Creating the course title heading element
                const courseTitleHeading = document.createElement("h2");
                courseTitleContainer.appendChild(courseTitleHeading);
                courseTitleHeading.classList.add("ui", "header");
            },
            set: function() {
                // Selecting the created heading element
                const courseTitleHeading = document.querySelector("main > div > h2");
                
                // Using an utility function to get the course id from the url
                const currentCourse = page.course.utility.getCourseId();
                
                // Setting database values to HTML elements
                courseTitleHeading.innerText = coursesObj[currentCourse].title;
            }
        },
        "sections": {
            createElement: function() {
                // Main element that's already written to the document manually
                const mainElement = document.querySelector("main");
                
                // Figuring out how many sections to create
                // Getting the current course id
                const currentCourse = page.course.utility.getCourseId();
                // Getting all the elements within one course id
                const courseElementsArray = Object.keys(coursesObj[currentCourse]);
                // Because a course title is also an element I need to use a filter to only get sections
                const courseSections = courseElementsArray.filter(element => {
                    return element.substring(0, 7) === "section";
                });
                
                // Creating the same amount of sections that there are instances of it within the db file
                for (let i = 0; i < courseSections.length; i++) {
                    // Creating a section element to contain one whole section and its elements
                    let sectionElement = document.createElement("section");
                    mainElement.appendChild(sectionElement);
                    sectionElement.classList.add("section");
                    sectionElement.setAttribute("id", courseSections[i]);
                }
                // Creating section heading container
                page.course.sections.createHeadingContainers();
                
                //Creating section body container
                page.course.sections.createBodyContainers();
            },
            createHeadingContainers: function() {
                // selecting section elements
                const sectionElements = document.querySelectorAll("section");
                
                // creating a section heading container elements
                sectionElements.forEach(section => {
                    const sectionHeadingContainer = document.createElement("div");
                    section.appendChild(sectionHeadingContainer);
                    sectionHeadingContainer.classList.add("ui", "container", "right", "aligned", "margin-top-small", "margin-bottom-small", "section-header");
                });
                // creating section heading dividers
                page.course.sections.createDividers();
                
                // creating section title
                page.course.sections.createTitle();
            },
            createDividers: function() {
                // Selecting section header containers
                const sectionHeadingContainers = document.querySelectorAll("section > .section-header");
                
                // Creating section dividers which are heading elements
                sectionHeadingContainers.forEach(container => {
                    const sectionHeading = document.createElement("h3");
                    container.appendChild(sectionHeading);
                    sectionHeading.classList.add("ui", "tiny", "header", "horizontal", "divider");
                });
                // Creating divider content
                page.course.sections.createDividerContent();
            },
            createDividerContent: function() {
                // Creating icons for the section heading divider
                page.course.sections.createDividerIcon();
                page.course.sections.createDividerText();
            },
            createDividerIcon: function() {
                // Selecting section dividers
                const sectionDividers = document.querySelectorAll("section > .section-header > .divider");
                
                // Creating icons for section dividers
                sectionDividers.forEach(divider => {
                    const dividerIcon = document.createElement("i");
                    divider.appendChild(dividerIcon);
                    dividerIcon.classList.add("circle", "outline", "icon");
                });
            },
            createDividerText: function() {
                // Selecting section dividers
                const sectionDividers = document.querySelectorAll("section > .section-header > .divider");
                //console.log(sectionDividers);
                
                // Creating text for section dividers
                sectionDividers.forEach(divider => {
                    const dividerText = document.createElement("span");
                    divider.appendChild(dividerText);
                    dividerText.classList.add("section-divider-text");
                });
            },
            createTitle: function() {
                // Selecting section header containers
                const sectionHeadingContainers = document.querySelectorAll("section > .section-header");
                
                // Creating section titles which are paragraph elements
                sectionHeadingContainers.forEach(container => {
                    const sectionTitle = document.createElement("p");
                    container.appendChild(sectionTitle);
                    sectionTitle.classList.add("ui", "details", "section-title");
                });
            },
            createBodyContainers: function() {
                // Selecting section elements
                const sectionElements = document.querySelectorAll("section");
                
                // Creating section body container elements
                sectionElements.forEach(section => {
                    const sectionBodyContainer = document.createElement("div");
                    section.appendChild(sectionBodyContainer);
                    sectionBodyContainer.classList.add("ui", "container", "margin-top-small", "margin-bottom-small", "section-body");
                });
            }
        },
        "chapters": {
            create: function() {
                this.createChapterList();
                this.createChapters();
                this.createChapterListItemContent();
            },
            createChapterList: function() {
                // Selecting section body container elements
                const sectionBodyContainers = document.querySelectorAll(".section-body");
                
                // Creating chapter list elements
                sectionBodyContainers.forEach(container => {
                    const chapterList = document.createElement("div");
                    container.appendChild(chapterList);
                    chapterList.classList.add("ui", "list", "chapter-list");
                });
            },
            createChapters: function() {
                // Selecting chapter list elements
                const chapterLists = document.querySelectorAll(".chapter-list");
                
                // Figuring out how many chapters to create
                // Getting the current course id
                const currentCourse = page.course.utility.getCourseId();
                // Getting all the elements within one course id
                const courseElementsArray = Object.keys(coursesObj[currentCourse]);
                // Because a course title is also an element I need to use a filter to only get sections
                const courseSections = courseElementsArray.filter(element => {
                    return element.substring(0, 7) === "section";
                });
                //console.log(courseSections);
                
                courseSections.forEach(section => {
                    const sectionChaptersArray = Object.keys(coursesObj[currentCourse][section]);
                    const sectionChapters = sectionChaptersArray.filter(element => {
                        return element.substring(0, 7) === "chapter";
                    });
                    //console.log(sectionChapters);
                    this.createSectionChapterList(section, sectionChapters);
                });
            },
            createSectionChapterList: function(section, chapterList) {
                //console.log(section);
                //console.log(chapterList);
                
                // To get the section number I'm splitting the section id twice because the id is: section_courseID-sectionID
                const sectionNumber = parseInt(section.split("_")[1].split("-")[1]);
                //console.log(sectionNumber);
                
                // To get the number of chapters within a section I'm just using the array length property
                //const chapterAmount = chapterList.length;
                //console.log(chapterAmount);
                
                // Creating the correct number of chapters for each section
                this.createChapterListItems(sectionNumber, chapterList);
            },
            createChapterListItems: function(sectionNumber, chapterListArray) {
                // Selecting the chapter list (container) elements
                const chapterList = document.querySelectorAll(".chapter-list");
                //console.log(chapterList);
                
                // Creates the list item element which is an anchor element
                for (let i = 0; i < chapterListArray.length; i++) {
                    const chapterListItem = document.createElement("a");
                    // The sectionNumber - 1 part makes the chapers sync up with the array of nodes
                    chapterList[sectionNumber - 1].appendChild(chapterListItem);
                    chapterListItem.classList.add("item", "chapter-list-item");
                    chapterListItem.setAttribute("id", chapterListArray[i]);
                }
            },
            createChapterListItemContent: function() {
                this.createChapterIcon();
                this.createChapterTitle();
            },
            createChapterIcon: function() {
                // Selecting the chapter list item elements
                const chapterListItems = document.querySelectorAll(".chapter-list-item");
                //console.log(chapterListItems);
                
                // Creating icon elements
                chapterListItems.forEach(item => {
                    const chapterIcon = document.createElement("i");
                    item.appendChild(chapterIcon);
                    chapterIcon.classList.add("large", "middle", "aligned", "circle", "outline", "icon");
                });
            },
            createChapterTitle: function() {
                this.createChapterTitleContainer();
                this.createChapterMainTitle();
                this.createChapterSubTitle();
            },
            createChapterTitleContainer: function() {
                // Selecting the chapter list item elements
                const chapterListItems = document.querySelectorAll(".chapter-list-item");
                
                // Creating chapter title container elements
                chapterListItems.forEach(item => {
                    const titleContainer = document.createElement("div");
                    item.appendChild(titleContainer);
                    titleContainer.classList.add("content");
                });
            },
            createChapterMainTitle: function() {
                // Selecting the chapter list item title container elements
                const chapterTitleContainers = document.querySelectorAll(".chapter-list-item > .content");

                // Creating chapter main title elements
                chapterTitleContainers.forEach(container => {
                    const mainTitle = document.createElement("div");
                    container.appendChild(mainTitle);
                    mainTitle.classList.add("header");
                });
            },
            createChapterSubTitle: function() {
                // Selecting the chapter list item title container elements
                const chapterTitleContainers = document.querySelectorAll(".chapter-list-item > .content");

                // Creating chapter subtitle elements
                chapterTitleContainers.forEach(container => {
                    const subTitle = document.createElement("div");
                    container.appendChild(subTitle);
                    subTitle.classList.add("description");
                });
            }
        },
        "utility": {
            getCourseId: function() {
                // Getting the current URL of the page
                const urlPath = window.location.pathname;
                //console.log(urlPath);
                
                // Splitting the current URL into an array
                const urlPathArray = urlPath.split("/");
                //console.log(urlPathArray);
                //console.log(urlPathArray[2].substring(0, 6));
                
                // Finding the current chapter by comparing the substring of an element to make sure the correct chapter is found even if path is changed
                const currentCourse = urlPathArray.find(element => {
                    return element.substring(0, 6) === "course";
                });
                //console.log(currentCourse);
                
                // Returning the course id
                return currentCourse;
            }
        }
    }
};



// Creating the course title element
page.course.title.createElement();

// Setting the course title
page.course.title.set();



// Creating sections
page.course.sections.createElement();

// Creating chapter lists
page.course.chapters.create();

console.log(coursesObj["course_1"]["section_1-1"].title);
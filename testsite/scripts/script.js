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

                    /* // Get first part of sectionId
                    let sectionId = courseSections[i].split("-")[0];
                    console.log(sectionId);

                    // Get second part of sectionId
                    let sectionNumber = coursesObj[currentCourse][courseSections[i]].sectionNum;
                    console.log(sectionNumber); */

                    
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
            },
            setTitles: function() {
                this.setDividerTitle();
                this.setSectionTitle();
            },
            setDividerTitle: function() {
                // Selecting all sections
                const sections = document.querySelectorAll(".section");

                // Creating text node as the section divider title
                sections.forEach(section => {
                    // Using the id attribute to get the number for each section
                    const currentSection = section.getAttribute("id").split("_")[1].split("-")[1];
                    //console.log(currentSection);

                    // Creating the text node
                    const sectionDividerTitleContainer = section.children[0].children[0];
                    const sectionDividerTitleText = document.createTextNode("Section " + currentSection);
                    sectionDividerTitleContainer.appendChild(sectionDividerTitleText);

                    //console.log(section.children[0].children[0]);
                });
            },
            setSectionTitle: function() {
                // Selecting all sections
                const sections = document.querySelectorAll(".section");

                // Setting the section title
                sections.forEach(section => {
                    // Getting current course and section ids
                    const currentCourse = page.course.utility.getCourseId();
                    const currentSection = section.getAttribute("id");

                    //console.log(currentSection);
                    //console.log(section.children[0].children[1]);

                    // Getting the current section title
                    const currentSectionTitle = coursesObj[currentCourse][currentSection].title;
                    //console.log(coursesObj[currentCourse][currentSection]);

                    // Creating the text node for the section title
                    const sectionTitleContainer = section.children[0].children[1];
                    const sectionTitleText = document.createTextNode(currentSectionTitle);
                    sectionTitleContainer.appendChild(sectionTitleText);
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
            },
            setTitles: function() {
                this.setChapterMainTitle();
                this.setChapterSubTitle();
            },
            setChapterMainTitle: function() {
                // Selecting all chapter list items
                const chapterListItems = document.querySelectorAll(".chapter-list-item");
                //console.log(chapterListItems);

                // Creating chapter main title
                chapterListItems.forEach(item => {
                    // Getting the current chapter number
                    const currentChapter = item.getAttribute("id").split("_")[1].split("-")[2];
                    //console.log(currentChapter);

                    // Creating the text node for main title
                    const mainTitleContainer = item.children[1].children[0];
                    //console.log(mainTitleContainer);
                    const mainTitleText = document.createTextNode("Chapter " + currentChapter);
                    mainTitleContainer.appendChild(mainTitleText);
                });
            },
            setChapterSubTitle: function() {
                //
                //const sections = document.querySelectorAll(".section");
                
                const chapterListItems = document.querySelectorAll(".chapter-list-item");
                //console.log(chapterListItems);

                chapterListItems.forEach(item => {
                    //console.log(item);
                    const currentChapter = item.getAttribute("id");
                    //console.log(currentChapter);

                    const chapterSubTitle = this.getChapterSubTitles(currentChapter);

                    const chapterSubTitleContainer = item.children[1].children[1];
                    //console.log(chapterSubTitleContainer);
                    const chapterSubTitleText = document.createTextNode(chapterSubTitle);
                    chapterSubTitleContainer.appendChild(chapterSubTitleText);
                });

                //
                /* sections.forEach(section => {
                    const chapterListItems = section.children[1].children[0].children;
                    console.log(chapterListItems);

                    for (let i = 0; i < chapterListItems.length; i++) {
                        console.log(chapterListItems[i].getAttribute("id"));
                    }

                }); */
            },
            getChapterSubTitles: function(currentChapter) {
                // Getting the course id for the db object
                const currentCourse = page.course.utility.getCourseId();
                //console.log(currentCourse);
                //console.log(currentChapter);

                // Getting the section id for the db object
                const currentSectionArray = currentChapter.split("_")[1].split("-");
                //console.log(currentSectionArray);
                const currentSection = `section_${currentSectionArray[0]}-${currentSectionArray[1]}`;
                //console.log(currentSection);

                // Returning the chapter titles
                return coursesObj[currentCourse][currentSection][currentChapter].title;
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

// Setting section titles
page.course.sections.setTitles();

// Setting chapter titles
page.course.chapters.setTitles();
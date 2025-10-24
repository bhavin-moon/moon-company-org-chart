// Moon Company Complete Organizational Data
// Extracted from official company roster

const organizationalData = {
    directors: [
        { name: "Durga Moondra", title: "Founder & Director", initials: "DM" },
        { name: "Ratan Moondra", title: "Co-Founder & Director", initials: "RM" },
        { name: "Ashish Jhagarawat", title: "Director", initials: "AJ" }
    ],

    seniorManagers: {
        namita: {
            name: "Namita",
            title: "Senior Manager",
            initials: "NM",
            departments: {
                "Tax and Accounts Payable": [
                    "Mansi Padhiar",
                    "Manisha Mishra",
                    "Swapnil Bhosale",
                    "Krunal Gandhi"
                ],
                "Banking": [
                    "Vaishali Sawant",
                    "Jyoti Dalvi"
                ],
                "Accounts": [
                    "Vaishnavi Chafekarande",
                    "Ritika Nair",
                    "Shweta Patil"
                ],
                "DSPF": [
                    "Kamini Bhoir",
                    "Hemangi Jadhav",
                    "Shraddha Kamble",
                    "Sakshi Bhoite",
                    "Rutuja Gavali",
                    "Priyanka Kamble"
                ],
                "DTAP": [
                    "Sagar Shinde",
                    "Dhanashree Patil",
                    "Pooja Sawant",
                    "Sneha Dhavale"
                ],
                "Admin": [
                    "Deepak Parab",
                    "Munja Sheikh",
                    "Neelam Yadav",
                    "Anita Kamble",
                    "Rahul Pawar"
                ],
                "HR": [
                    "Priyanka Naik",
                    "Akshaya Shinde",
                    "Raj Shree Patil",
                    "Divya Menon"
                ],
                "Accounts Receivable": [
                    "Pradnya Shelar",
                    "Nikita Sawant",
                    "Priya Bhosale"
                ],
                "GST": [
                    "Shivani Pawar",
                    "Purnima Shinde",
                    "Manali Jadhav",
                    "Snehal Patil"
                ],
                "KPO": [
                    "Sanjay Kumar",
                    "Rohit Sharma",
                    "Meera Nair",
                    "Anjali Verma"
                ],
                "MPR/QPR/HPR/IEC/RCMC": [
                    "Suresh Patil",
                    "Ganesh Naik",
                    "Kavita Bhoir",
                    "Yogita Pawar"
                ],
                "ACCOUNTS RECEIVABLE - Namita Mam": [
                    "Pradnya Shelar",
                    "Vaishali Patil"
                ]
            }
        },
        radhika: {
            name: "Radhika",
            title: "Senior Manager",
            initials: "RM",
            departments: {
                "Approval": [
                    "Sneha Joshi",
                    "Priyanka Sharma"
                ],
                "ROC": [
                    "Amit Desai",
                    "Shruti Kulkarni",
                    "Pooja Naik"
                ],
                "Billing": [
                    "Rahul Patil",
                    "Neha Sawant",
                    "Ashwini Bhoir"
                ],
                "Contract": [
                    "Siddharth Rao",
                    "Megha Pawar"
                ],
                "Quotation": [
                    "Kiran Shinde",
                    "Rupali Jadhav"
                ],
                "Marketing - Business Development": [
                    "Vikram Singh",
                    "Priyanka Menon",
                    "Arjun Sharma"
                ],
                "Cultural Program Moon": [
                    "Divya Nair",
                    "Anjali Kumar"
                ]
            }
        },
        gyan: {
            name: "Gyan",
            title: "Senior Manager",
            initials: "GM",
            departments: {
                "BOE": [
                    "Rajesh Kumar",
                    "Sunita Patil",
                    "Mahesh Sawant"
                ],
                "Removal": [
                    "Vijay Naik",
                    "Priya Bhosale"
                ],
                "Customs": [
                    "Anil Sharma",
                    "Kavita Jadhav",
                    "Sanjay Pawar"
                ],
                "Softex and Export": [
                    "Rahul Shinde",
                    "Neeta Kamble",
                    "Suresh Patil"
                ],
                "Exit": [
                    "Ganesh Naik",
                    "Priyanka Sawant"
                ],
                "Monitoring": [
                    "Amit Bhoir",
                    "Sneha Parab",
                    "Rohit Jadhav"
                ],
                "APR": [
                    "Kiran Patil",
                    "Manisha Shinde"
                ]
            }
        },
        bhavin: {
            name: "Bhavin",
            title: "Senior Manager - IT & Digital",
            initials: "BV",
            departments: {
                "Software": [
                    "Rohan Desai",
                    "Ankita Sharma",
                    "Nikhil Patil",
                    "Shruti Naik"
                ],
                "Digital Marketing": [
                    "Priya Menon",
                    "Arjun Singh",
                    "Divya Sawant"
                ],
                "IT Hardware": [
                    "Sanjay Kumar",
                    "Rajesh Bhoir",
                    "Amit Pawar"
                ]
            }
        }
    }
};

// Calculate statistics
function calculateOrgStats() {
    let totalEmployees = 3; // Directors
    let totalDepartments = 0;

    Object.values(organizationalData.seniorManagers).forEach(manager => {
        totalEmployees++; // Count the senior manager
        Object.values(manager.departments).forEach(dept => {
            totalDepartments++;
            totalEmployees += dept.length;
        });
    });

    return {
        directors: 3,
        seniorManagers: 4,
        departments: totalDepartments,
        totalEmployees: totalEmployees
    };
}

// Export data
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { organizationalData, calculateOrgStats };
}

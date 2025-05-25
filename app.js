        function calculateAge() {
            // Get the birth date input element
            const birthDateInput = document.getElementById('birthDate');
            const resultsContent = document.getElementById('resultsContent');
            
            // Check if user has entered a birth date
            if (!birthDateInput.value) {
                showError('Please select your date of birth first!');
                return;
            }
            
            // Create Date objects for calculation
            const birthDate = new Date(birthDateInput.value);
            const currentDate = new Date();
            
            // Validate that birth date is not in the future
            if (birthDate > currentDate) {
                showError('Birth date cannot be in the future!');
                return;
            }
            
            // Calculate the age difference
            const ageData = calculateDetailedAge(birthDate, currentDate);
            
            // Display the results
            displayAgeResults(ageData);
        }
        
        function calculateDetailedAge(birthDate, currentDate) {
            let years = currentDate.getFullYear() - birthDate.getFullYear();
            let months = currentDate.getMonth() - birthDate.getMonth();
            let days = currentDate.getDate() - birthDate.getDate();
            
            // Adjust for negative days
            if (days < 0) {
                months--;
                // Get the number of days in the previous month
                const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
                days += previousMonth.getDate();
            }
            
            // Adjust for negative months
            if (months < 0) {
                years--;
                months += 12;
            }
            
            // Calculate total days lived
            const totalDays = Math.floor((currentDate - birthDate) / (1000 * 60 * 60 * 24));
            
            return {
                years: years,
                months: months,
                days: days,
                totalDays: totalDays
            };
        }
        
        function displayAgeResults(ageData) {
            const resultsContent = document.getElementById('resultsContent');
            
            // Create the main age display
            let mainAgeText = '';
            if (ageData.years > 0) {
                mainAgeText = `${ageData.years} ${ageData.years === 1 ? 'year' : 'years'} old`;
            } else if (ageData.months > 0) {
                mainAgeText = `${ageData.months} ${ageData.months === 1 ? 'month' : 'months'} old`;
            } else {
                mainAgeText = `${ageData.days} ${ageData.days === 1 ? 'day' : 'days'} old`;
            }
            
            // Create detailed breakdown
            const breakdown = `
                Exactly: ${ageData.years} years, ${ageData.months} months, and ${ageData.days} days<br>
                Total days lived: ${ageData.totalDays.toLocaleString()} days
            `;
            
            // Update the display
            resultsContent.innerHTML = `
                <div class="age-display">${mainAgeText}</div>
                <div class="age-breakdown">${breakdown}</div>
            `;
        }
        
        function showError(message) {
            const resultsContent = document.getElementById('resultsContent');
            resultsContent.innerHTML = `<div class="error-message">${message}</div>`;
        }
        
        // Allow Enter key to trigger calculation
        document.getElementById('birthDate').addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                calculateAge();
            }
        });
        
        // Set max date to today to prevent future dates
        document.getElementById('birthDate').setAttribute('max', new Date().toISOString().split('T')[0]);
    
import './style.css';
import {
  fetchDataFromXpSummariesApi,
  getDataFromXpSummariesApiResponse,
  fetchUserIdFromUsername
} from './duolingoApi';


function displayStatsBySummaryData(summaryData) {
  const wrapperElement = document.getElementById('results_output');
  const outputElement  = wrapperElement.querySelector('p');

  wrapperElement.style.display = 'block';

  outputElement.innerText = '';
  outputElement.innerText += `You spend ${summaryData.totalTimeSpendHours.toFixed(2)} hour(s) learning.\n`;
  outputElement.innerText += `This time was achieved by completing ${summaryData.sessionCount} lesson(s) over a period of ${summaryData.totalDayCount} day(s).\n`;
  outputElement.innerText += `During this time, you used ${summaryData.frozenCount} streak freeze(s).\n`;

  if (summaryData.mostRecentDay) {
    const mostRecentDay         = summaryData.mostRecentDay;
    const mostRecentDayDate     = new Date(mostRecentDay.date * 1000);
    const dateFormattingOptions = { year: "numeric", month: "2-digit", day: "numeric" };

    const dateFormatted     = mostRecentDayDate.toLocaleString("nl-NL", dateFormattingOptions);
    const mostRecentDayTime = (mostRecentDay.totalSessionTime / 60).toFixed(2);

    outputElement.innerText += `\nOn your most recent active day (${dateFormatted}) you got ${mostRecentDay.gainedXp} XP by doing ${mostRecentDay.numSessions} lesson(s).\nYou spend ${mostRecentDayTime} minute(s) that day doing lesson(s).\n`;
  }
}

async function onFetchStatusButtonClick() {
  const username = document.getElementById('user_name_input').value;

  if (! username) {
    alert('Please enter a username to get the stats for!');

    return;
  }

  const userId       = await fetchUserIdFromUsername(username);
  const responseData = await fetchDataFromXpSummariesApi(userId);
  const summaryData  = getDataFromXpSummariesApiResponse(responseData);

  console.log('RAW DATA', responseData);
  console.log('RAW SUMMARY DATA', summaryData);

  displayStatsBySummaryData(summaryData);
}

document.getElementById('button_fetch_status').addEventListener('click', onFetchStatusButtonClick);

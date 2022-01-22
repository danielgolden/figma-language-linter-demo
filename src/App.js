import './App.css';

import Suggestion from './Suggestion'

import { useState } from "react";
import { retext } from "retext";
import retextIndefiniteArticle from "retext-indefinite-article";
import retextRepeatedWords from "retext-repeated-words";
import retextStringify from "retext-stringify";
import retextReadability from "retext-readability";
import retextSentenceSpacing from "retext-sentence-spacing";
import retextPassive from "retext-passive";
import retextContractions from "retext-contractions";
import retextEquality from 'retext-equality'
import retextSpell from "retext-spell";
import en_us_aff from './en_aff.js'
import en_us_dic from './en_dic.js'

import NewRelicLogo from './images/new-relic-logo.svg';


import { 
  Button, 
  TextField, 
  Stack, 
  Typography, 
  List, 
} from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// import { reporter } from "vfile-reporter";

function App() {
  const [report, setReport] = useState([]);
  const [sampleText, setSampleText] = useState(
    `There were some issues iwth other projects not being meant for use in the browser so I decided to try this one out. It's called "Retext" and it comes with a really nice set of of plugins.  I think it offers lots of customization which Im really excited about. Firemen are cool.

The constellation also contains an isolated neutron star—Calvera—and Orion, the hottest star yet discovered, with a surface temperature of 200,000 kelvin`
  );

  const retextSpellOptions = {
    dictionary: callback => {
      callback(null, {
        aff: en_us_aff,
        dic: en_us_dic,
      })
    },
    max: 5,
  }

  const lintMyText = () => {
    retext()
      .use(retextContractions)
      .use(retextSpell, retextSpellOptions)
      .use(retextRepeatedWords)
      .use(retextEquality)
      .use(retextIndefiniteArticle)
      .use(retextReadability)
      .use(retextSentenceSpacing)
      .use(retextPassive)
      .use(retextStringify)
      .process(sampleText)
      .then((report) => {
        setReport(report);
        console.log(report);
      });
  }

  const handleTextAreaOnChange = (event) => {
    setSampleText(event.target.value);
  };

  const handleButtonTrigger = () => {
    lintMyText();
  }

  const renderReport = () => {
    if (report?.messages?.length > 0) {
      return report.messages.map((suggestion, index) => {
        return(
        <Suggestion 
          suggestion={suggestion}
          sourceText={report.value}
        />
        )
      });
    } else {
      return (
      <Typography variant="body1">No suggestions to show...</Typography>
      )
    }
  };

  return (
    <Stack 
      alignItems="flex-start" 
      spacing={0} 
      direction="row" 
      className="App"
    >
      <div className="primary-section">
        <Typography variant="h3" component="div" gutterBottom className="page-title">
          <img src={NewRelicLogo} alt="New Relic logo" className="new-relic-logo" />
          Language linter demo (WIP)
        </Typography>
        <Typography variant="body1">
          Like Grammarly for people who write New Relic UI copy, but focused on writing-style more than grammar.
        </Typography>
        <Stack alignItems="flex-end" spacing={2} className="form">
          <TextField
            className="textfield"
            value={sampleText}
            multiline
            sx={{
              width: `100%`,
              maxWidth: '1000px',
            }}
            maxRows={14}
            label="Sample copy"
            onChange={(e) => handleTextAreaOnChange(e)}
            variant='filled'
          />
          <Button variant='contained' onClick={() => handleButtonTrigger()}>Lint text</Button>
          <hr className="standard-hr"/>
          <div className="about">
            <Typography variant="h5" component="div" gutterBottom>
              🧐 What's this for?
            </Typography>
            <p>
              It's a tool built for designers, engineers and anyone else who writes NR1 copy. 
              Why? So that they can vet their copy for basic issues like passive voice, 
              deprecated terms, insensitive language, and more. This way we can reserve the 
              time of our friends in {` `}
              <a href="https://newrelic.slack.com/archives/CE7FX92TF">#ui-writing</a> {` `}
              for more in-depth language issues.
            </p>
            
            <Typography variant="h5" component="div" gutterBottom>
            🖋️ What rules does this demo use?
            </Typography>
            <p>
              I picked some of the {` `} 
              <a href="https://unifiedjs.com/explore/?q=retext">out of the box rules</a> 
              {` `} for this demo, but in addition to being able to {` `}
              <a href="https://unifiedjs.com/learn/guide/create-a-plugin/">create our own rules</a>
              , we can customize the existing ones. Here are the rules used in this demo:
            </p>
            <ul>
              <li>
                <a href="https://unifiedjs.com/explore/package/retext-contractions/">
                  Contractions
                </a>
              </li>
              <li>
                <a href="https://unifiedjs.com/explore/package/retext-repeated-words/">
                  Repeated words
                </a>
              </li>
              <li>
                <a href="https://unifiedjs.com/explore/package/retext-equality/">
                  Equality
                </a>
              </li>
              <li>
                <a href="https://unifiedjs.com/explore/package/retext-indefinite-article/">
                  Indifinite article
                </a>
              </li>
              <li>
                <a href="https://unifiedjs.com/explore/package/retext-readability/">
                  Readability
                </a>
              </li>
              <li>
                <a href="https://unifiedjs.com/explore/package/retext-sentence-spacing/">
                  Sentence spacing
                </a>
              </li>
              <li>
                <a href="https://unifiedjs.com/explore/package/retext-passive/">
                  Passive voice
                </a>
              </li>
            </ul>

            <Typography variant="h5" component="div" gutterBottom>
              💬 I have questions or ideas
            </Typography>
            <p>
              Reach out to me on slack {` `}
              <a href="https://newrelic.slack.com/archives/DJZP8JQ8M">@dgolden</a> 
              {` `}👋🏽. I'd love to hear/talk about them.
            </p>
          </div>
        </Stack>
      </div>
        <Stack className="suggestions-container">
          <Typography variant="h4">Suggestions</Typography>
          {report?.messages?.length > 0 ? (
            <List className="suggestion-list">
              {renderReport()}
            </List>
          ) : (
            <Typography variant="body1" className="suggestions-empty-state">Click "lint text" to get started</Typography>
          )}
        </Stack>
    </Stack>
  );
}

export default App;

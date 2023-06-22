import React, {useState} from 'react'; 

import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
// Component
import { BackgroundImage1, BackgroundImage2, FooterCon, FooterLink, GenerateQuoteButton, GenerateQuoteButtonText, QuoteGeneratorCon, QuoteGeneratorInnerCon, QuoteGeneratorSubTitle, QuoteGeneratorTitle } from '@/components/QuoteGenerator/QuoteGeneratorElements'
import { GradientBackgroundCon } from '@/components/QuoteGenerator/QuoteGeneratorElements'

// Assets 
import Cloud1 from '@/assets/cloudy-weather.png'
import Cloud2 from '@/assets/cloud-and-thunder.png'

export default function Home() {
  const [numberOfQuotes, setNumberOfQuotes] = useState<Number | null>(0);

  return (
    <>
      <Head>
        <title>Inspiration Quote Generator</title>
        <meta name="description" content="Generate Quotes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/*background*/}
      {/* Quote Generator Modal pop uo*/}
      { /* <QuoteGeneratorModal /> */}

      <QuoteGeneratorCon>
        <QuoteGeneratorInnerCon>
          <QuoteGeneratorTitle>
            Daily Inspiration Generator
          </QuoteGeneratorTitle>

          <QuoteGeneratorSubTitle>
            Looking for a splash of inspiration? Generate a quote card with a 
            random inspirational quote provided by <FooterLink href="https://zenquotes.com.io/"
            target="_blank" rel ="noopener noreferrer">ZenQuotesAPI</FooterLink>
          </QuoteGeneratorSubTitle>
          <GenerateQuoteButton>
            <GenerateQuoteButtonText onClick={null}>
              Make a Quote
            </GenerateQuoteButtonText>
          </GenerateQuoteButton>
        </QuoteGeneratorInnerCon>
      </QuoteGeneratorCon>



      <GradientBackgroundCon>
        <BackgroundImage1
          src = {Cloud1}
          height = "300"
          alt = "cloudybackground1"
          />
        <BackgroundImage2
          src = {Cloud2}
          height= "300"
          alt = "cloudybackground2"
        />
        <FooterCon>
          <>
            Quotes Generated: {numberOfQuotes}
            <br />
            Developed by <FooterLink href="https://www.linkedin.com/in/stephen-martinez-043553257/"
            target = "_blank" rel="noopener noreferrer"> @StephenMartinez </FooterLink>
          </>
        </FooterCon>
      </GradientBackgroundCon>
    </>
  )
}

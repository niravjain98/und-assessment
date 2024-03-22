import React from "react";
import "./PresidentialEndorsement.section.css";

export default function PresidentialEndorsement() {
  return (
    <section className='presidents-endorsement'>
      <div className='endorsement-content'>
        <img src='president-andrew-armacos.jpg' alt='President of the University - Andrew Armacos' className='president-photo' />
        <div className='endorsement-text'>
          <div className='message'>
            <h1>Message from the President</h1>
            <p>
              We are thrilled to announce our unwavering support for the University's latest social media campaign. This initiative signifies a crucial opportunity for our community to unite,
              interact, and effect significant change. Have thoughts or feedback on our campaign goals? We'd love to hear from you!
            </p>
          </div>
          <div className='goals'>
            <h2>Campaign Goals</h2>
            <p>
              <strong>Empowering Engagement:</strong> Our primary aim is to foster a vibrant online community where every voice is heard and valued. Through active participation and collaboration, we
              can amplify our collective impact and bring about positive change.
            </p>
            <p>
              <strong>Promoting Diversity and Inclusion:</strong> Diversity is our strength, and inclusivity is our foundation. We strive to create an inclusive online space that celebrates diverse
              perspectives, cultures, and experiences. Together, we can build a community where everyone feels welcome and respected.
            </p>
            <p>
              <strong>Driving Innovation:</strong> Innovation drives progress, and social media is a powerful tool for sparking creativity and innovation. We encourage innovative thinking and bold
              ideas that push the boundaries of what's possible. Let's harness the power of social media to drive positive change and innovation in our community and beyond.
            </p>
            <div className="feedback-link-container">
              <a href='https://und.edu/social-media' className='feedback-link'>
                Share your thoughts and feedback
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

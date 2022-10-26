import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import FeedItem from '../client/components/FeedItem.js'
import MatchesItem from '../client/components/MatchesItem.js';
import regeneratorRuntime from 'regenerator-runtime';

describe('Unit testing React components', () => {
    xdescribe('FeedItem', () => {
        let item;
        const props = {
          username: 'Dennis',
          age: '28',
          location: 'Queens',
          comment: 'Beefy',
          proglang: 'Javascript',
          url: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.finedininglovers.com%2Fsites%2Fg%2Ffiles%2Fxknfdk626%2Ffiles%2Fstyles%2Fim_landscape_100%2Fpublic%2F2020-12%2FBeef-Cuts_%25C2%25A9rory_midhani.jpg.webp%3Fitok%3Dbi3PEmnA&imgrefurl=https%3A%2F%2Fwww.finedininglovers.com%2Farticle%2Fbeef-cuts-explained&tbnid=hsh_GyQHBALY1M&vet=12ahUKEwio9rjOl_76AhUPunIEHSNtDM0QMygMegUIARChAg..i&docid=8X9TnJ3AF5wpvM&w=1440&h=960&q=beef&hl=en&ved=2ahUKEwio9rjOl_76AhUPunIEHSNtDM0QMygMegUIARChAg'
        };

        beforeEach(() => {
          item = render(<FeedItem user={props}/>)
        });

        test('Renders username to FeedItem', () => {
          const userName = item.container.querySelector('#userName')
          expect(userName).toHaveTextContent(props.username);
        });

        test('Renders image url to FeedItem', () => {
          const image = item.container.querySelector('img')
          expect(image).toHaveAttribute('src', props.url);
        });

        test('Renders user details to FeedItem', () => {
          const userDetail = item.container.querySelectorAll('p')
          expect([...userDetail][0]).toHaveTextContent('Age: ', props.age);
          expect([...userDetail][1]).toHaveTextContent('Location: ', props.location);
          expect([...userDetail][2]).toHaveTextContent('Bio: ', props.comment);
          expect([...userDetail][3]).toHaveTextContent('Programming Language: ', props.proglang);
        });
    });
  describe('MatchesItem', () => {
    let item;
    const props = {
      username: "Peter",
      age: '28',
      location: 'JOISEY',
      comment: 'SQLGOD',
      proglang: 'Javascript',
      url: 'https://media.tenor.com/JTDcetphNdoAAAAC/mudkip-cute.gif',
    };

    beforeEach(() => {
      item = render(<MatchesItem user={props}/>)
    });

    test('Renders username to MatchesItem', () => {
      const userName = item.getByRole('heading', {id: 'userName'});
      expect(userName).toHaveTextContent(props.username);
    });

    test('Renders image url to MatchesItem', () => {
      const image = item.getByRole('img', {'src': props.url});
      expect(image).to
    })

    // xtest('Renders user detail to MatchesItem', () => {
    //   const userName 
    // })

  });
  
})
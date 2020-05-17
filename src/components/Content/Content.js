import React from 'react';
import Button from './Button/Button';
import classes from './Content.module.css';

const content = (props) => {
  let paragraphs = null;
  let buttons = null;
  let collumnsInput = null;

  if (!props.isLoggedIn) {
    paragraphs = props.content.paragraphs.map((paragraph, index) => {
      if (paragraph.toLowerCase().startsWith('http')) {
        return (
          <a
            href={paragraph}
            key={index}
            target='_blank'
            rel='noopener noreferrer'
          >
            <img className={classes.img} src={paragraph} alt={paragraph} />
          </a>
        );
      }
      return (
        <div>
          <p
            className={classes.paragraph}
            key={index}
            dangerouslySetInnerHTML={{
              __html: paragraph,
            }}
          />
        </div>
      );
    });
  }

  if (props.isLoggedIn) {
    paragraphs = props.content.paragraphs.map((paragraph, index) => {
      let url = 'none';
      let styling = classes.content;
      if (paragraph.toLowerCase().startsWith('http')) {
        url = `url(${paragraph})`;
        styling = classes.img;
      }
      return (
        <textarea
          className={styling}
          style={{ backgroundImage: url }}
          key={index}
          onChange={(event) => props.changed(event, index)}
          value={paragraph}
        ></textarea>
      );
    });

    collumnsInput = (
      <div style={{ display: 'flex' }}>
        <div className={classes.collumnsInput}>
          <span>Number of columns:</span>
          <input
            className={props.isAsymmetric ? null : classes.outline}
            disabled={props.isAsymmetric}
            onChange={props.numberOfCollumnsChanged}
            value={props.collumns}
            type='number'
          />
        </div>
        <button
          onClick={props.toggleAsymmetric}
          className={props.isAsymmetric ? classes.outline : null}
        >
          <div className={classes.asymmetricButton}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </button>
      </div>
    );

    buttons = (
      <div className={classes.buttons}>
        <div>
          <Button clicked={props.saveClicked} btnColor='Green'>
            Save
          </Button>
          <Button clicked={props.cancelClicked} btnColor='Red'>
            Reset
          </Button>
        </div>
        <div>
          <Button
            clicked={(event) => props.changeNumberOfParagraphs(event, true)}
            btnColor='Green'
          >
            +Add
          </Button>
          <Button
            clicked={(event) => props.changeNumberOfParagraphs(event, false)}
            btnColor='Red'
          >
            -Remove
          </Button>
        </div>
      </div>
    );
  }

  let asymmetricStyle = null;

  if (props.isAsymmetric) {
    asymmetricStyle = classes.asymmetric;
  }

  return (
    <div className={classes.content}>
      <h1 className={classes.header}>{props.content.category.toUpperCase()}</h1>
      {collumnsInput}
      {buttons}
      <div
        style={{ gridTemplateColumns: `repeat(${props.collumns}, 1fr)` }}
        className={[classes.wrapper, asymmetricStyle].join(' ')}
      >
        {paragraphs}
      </div>
      {collumnsInput}
      {buttons}
    </div>
  );
};

export default content;

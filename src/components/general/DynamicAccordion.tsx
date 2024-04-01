'use client';

import React, { ReactNode } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

/* CSS */
import styles from './DynamicAccordion.module.css';

interface ComponentProp {
  headLine: ReactNode;
  component: ReactNode;
}

interface DynamicAccordionProps {
  components?: ComponentProp[];
  children?: ReactNode;
  headLine?: ReactNode;
}

const DynamicAccordion: React.FC<DynamicAccordionProps> = ({
  components = [],
  children,
  headLine,
}) => {
  const renderComponents = components.map((item, index) => (
    <AccordionItem key={index} className={styles.accordion__item}>
      <AccordionItemHeading>
        <AccordionItemButton className={styles.accordion__button}>
          {item.headLine}
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel className={styles.accordion__item__panel}>
        {item.component}
      </AccordionItemPanel>
    </AccordionItem>
  ));

  const renderChildren = () => (
    <AccordionItem className={styles.accordion__item}>
      <AccordionItemHeading>
        <AccordionItemButton className={styles.accordion__button}>{headLine}</AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel className={styles.accordion__item__panel}>{children}</AccordionItemPanel>
    </AccordionItem>
  );

  return (
    <>
      {components.length > 0 ? (
        <Accordion allowZeroExpanded className={styles.accordion}>
          {renderComponents}
        </Accordion>
      ) : (
        <Accordion allowZeroExpanded className={styles.accordion}>
          {renderChildren()}
        </Accordion>
      )}
    </>
  );
};

export default DynamicAccordion;

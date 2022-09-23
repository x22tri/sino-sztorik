import React, { useEffect, useRef, createRef } from 'react'
import List from '@mui/material/List'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'

import ClickableCharListElement from './ClickableCharListElement'
import ListHeading from './ListHeading'
import ConditionalWrapper from '../../../auxiliaries/ConditionalWrapper'
import { characterNameFinder } from '../../../auxiliaries/keywordPrimitiveStatusFinder'
import './Lists.css'

const ClickableCharList = ({
  in: inProp,
  nameAndIcon,
  sourceArray,
  state,
  dispatch,
  transitionTimeout,
  type,
}) => {
  // On render, create refs for all constituents so that constituentList Recaps can be opened from the Story element.
  const storyRefs = useRef([])
  useEffect(() => {
    if (type === 'constituentList' && sourceArray) {
      storyRefs.current = sourceArray.map(
        (_, i) => storyRefs.current[i] ?? createRef()
      )
      dispatch({ type: 'loadConstituents', payload: storyRefs })
    }
  }, [type, sourceArray, storyRefs, dispatch])

  // Renders a list item for every object in the array of objects.
  // Phrases are stored in a different way than the other categories.
  if (!sourceArray?.length) return null
  else
    return (
      <>
        <ListHeading
          badgeContent={
            type !== 'constituentList' && !inProp ? sourceArray.length : 0
          }
          heading={nameAndIcon[0]}
          icon={nameAndIcon[1]}
          in={inProp}
          {...{ transitionTimeout }}
        />
        <ConditionalWrapper
          condition={type !== 'constituentList'}
          wrapper={children => (
            <Collapse in={inProp} timeout={transitionTimeout}>
              {children}
            </Collapse>
          )}
        >
          <Box sx={{ height: type === 'constituentList' ? '4px' : '8px' }} />
          <List dense disablePadding className='list'>
            {type !== 'phrases' &&
              sourceArray.map((character, index) => {
                const [mainCharacterName, secondaryCharacterName] = [
                  characterNameFinder(character)[0],
                  characterNameFinder(character)[1],
                ]

                return (
                  <ClickableCharListElement
                    key={index}
                    id={character?.charChinese || null}
                    ref={storyRefs.current[index]}
                    fade={type === 'constituentList'}
                    in={inProp}
                    firstElement={character?.charChinese}
                    secondElement={mainCharacterName}
                    thirdElement={secondaryCharacterName}
                    {...{
                      character,
                      dispatch,
                      index,
                      state,
                      transitionTimeout,
                    }}
                  />
                )
              })}
            {type === 'phrases' &&
              sourceArray.map((phrase, index) => (
                <ClickableCharListElement
                  key={index}
                  in={inProp}
                  firstElement={phrase.phraseChinese}
                  secondElement={phrase.phraseHungarian}
                  character={phrase.characters}
                  {...{ dispatch, index, transitionTimeout }}
                />
              ))}
          </List>
        </ConditionalWrapper>
        <Box sx={{ height: type === 'constituentList' ? '8px' : '16px' }} />
      </>
    )
}

export default ClickableCharList

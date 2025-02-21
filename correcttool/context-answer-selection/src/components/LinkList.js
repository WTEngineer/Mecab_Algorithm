import {
  Divider,

  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import React from 'react';

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function LinkList() {
  return (
    <List className="menulist">
      
        
        <ListItemLink
          color="textPrimary"
          href="https://translate.google.com/?hl=zh-TW&tab=TT#view=home&op=translate&sl=auto&tl=zh-CN"
          target="_blank"
          rel="noopener"
          underline="none"
        >
        <ListItemIcon>
          <Icon>g_translate</Icon>
        </ListItemIcon>
          <ListItemText primary="Google翻譯" />
        </ListItemLink>
      
      <Divider />
      
        
        <ListItemLink
          color="textPrimary"
          href="https://docs.google.com/spreadsheets/d/1ugnB8DEgdhT5E8YbIidNcF4AI4rObaMCdSjT4qG9lp0/edit#gid=2106039647"
          target="_blank"
          rel="noopener"
          underline="none"
        >
        <ListItemIcon>
          <Icon>today</Icon>
        </ListItemIcon>
          <ListItemText primary="日報" />
        </ListItemLink>
      
      <Divider />
      
        
        <ListItemLink
          color="textPrimary"
          href="https://docs.google.com/document/d/1v-Ttj7IFEgzA0Bo_WclSQp1nc-Ek7GPQrHZCerHK8hM/edit#heading=h.d23ii4u9uy4r"
          target="_blank"
          rel="noopener"
          underline="none"
        >
        <ListItemIcon>
          <Icon>history_edu</Icon>
        </ListItemIcon>
          <ListItemText primary="批注詞" />
        </ListItemLink>
      
      <Divider />
      
        
        <ListItemLink
          color="textPrimary"
          href="https://docs.google.com/spreadsheets/d/1cCY030BQSbDku2rkaoIjxMFN3U3ePLJSsnWG6qNHR8w/edit#gid=0"
          target="_blank"
          rel="noopener"
          underline="none"
        >
        <ListItemIcon>
          <Icon>calculate</Icon>
        </ListItemIcon>
          <ListItemText primary="數據計算" />
        </ListItemLink>
      
      <Divider />
      
        
        <ListItemLink
          color="textPrimary"
          href="https://docs.google.com/spreadsheets/d/1rcSdSl6M-ruV4bHOlzOmHvYEJFsbOxRjqVr0KXcQdCc/edit#gid=184557706"
          target="_blank"
          rel="noopener"
          underline="none"
        >
        <ListItemIcon>
          <Icon>filter_alt</Icon>
        </ListItemIcon>
          <ListItemText primary="篩選總表" />
        </ListItemLink>
      
      <Divider />
      
        
        <ListItemLink
          color="textPrimary"
          href="https://docs.google.com/spreadsheets/d/1_uNZrvOgcgTYnTA97Ygv3jJEAMCkjmTlCd4KWaeb2V8/edit#gid=0"
          target="_blank"
          rel="noopener"
          underline="none"
        >
        <ListItemIcon>
          <Icon>source</Icon>
        </ListItemIcon>
          <ListItemText primary="匯入處理" />
        </ListItemLink>
      
      <Divider />
      
        

        <ListItemLink
          color="textPrimary"
          href="https://docs.google.com/spreadsheets/d/1k9zLpIV5fNq66qujBc8cWxpvCa2nTqWScxlTmowG7Ws"
          target="_blank"
          rel="noopener"
          underline="none"
        >
        <ListItemIcon>
          <Icon>folder_shared</Icon>
        </ListItemIcon>
          <ListItemText primary="採購部共用" />
        </ListItemLink>
      
      <Divider />
      
        

        <ListItemLink
          color="textPrimary"
          href="https://docs.google.com/spreadsheets/d/1gqruDNC_8Dp3r5BEuD-lDiL8jlvb4rZMfvXWk1hrYHA"
          target="_blank"
          rel="noopener"
          underline="none"
        >
        <ListItemIcon>
          <Icon>folder_shared </Icon>
        </ListItemIcon>
          <ListItemText primary="Jayden共用" />
        </ListItemLink>
      
      <Divider />
    </List>
  )
}

export default LinkList

import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import styles from './MessageCard.style';

import database from '@react-native-firebase/database';
import { formatDistance, parseISO } from 'date-fns'
import { tr } from 'date-fns/locale';

import LikeButton from "../LikeButton";
import Button from "../Button";

const MessageCard = ({message, username}) => {
    const formatedDate = formatDistance(parseISO(message.date), new Date(), { addSuffix: true, locale: tr })
    const [liked, setLiked] = useState();

    useEffect(() => {
        if (message.likes && message.likes[username]) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [message.likes, username]);

    async function handleLike() {
        const messageRef = database().ref(`messages/${message.id}/likes`);
        
        const snapshot = await messageRef.once('value');
        const likesData = snapshot.val();
    
        if (!likesData) {
            await messageRef.child(username).set({ name: username });
            setLiked(true);
        }
        else if (likesData[username]) {
            await messageRef.child(username).remove();
            setLiked(false);
        }
        else {
            await messageRef.child(username).set({ name: username });
            setLiked(true);
        }
    }

    const deleteMessage = async () => {
        try {
            await database().ref(`messages/${message.id}`).remove();
        } catch (error) {
            console.error("Mesaj silinirken hata oluştu:", error);
        }
    };
    

    return (
        <View style={styles.container}>
            <View style={styles.inner_container}>
                <Text style={styles.user}>{message.username}</Text>
                <Text style={styles.date}>{formatedDate}</Text>
            </View>
            <Text style={styles.title}>{message.text}</Text>
            <View style={styles.butonContainer}>
                <LikeButton 
                    likeCount={
                        message.likes && Object.keys(message.likes).length > 0
                        ? Object.keys(message.likes).length
                        : null
                    }
                    icon= {
                        message.likes && Object.keys(message.likes).length > 0
                        ? "emoticon-confused-outline"
                        : "emoticon-neutral-outline"
                    }
                    onPress={handleLike}
                    theme={liked ? "primary" : "secondary"}
                />
            
            {
                message.username === username ? <Button icon={"delete"} theme="iconstyle" onPress={deleteMessage}/>
                : null
            }
            </View>
            
        </View>
    )
};

export default MessageCard;
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import {toast} from 'react-toastify';
//좋아요기능을 위한 hook 함수
//유저데이터와 게시물id를 가져와서
//user데이터 컬럼의 favoriteIds 부분에 게시물 좋아요를 누른 게시물id가 들어감
//현재 좋아요를 눌른 productId인자를 가져와
//iclude 메소드를 통해 현재 게시물이 favoriteIds에 들어가있는지를 확인
interface UserFavorite {
    communityId : string;
    currentUser ? : User | null;
}


const useFavorite = ({communityId, currentUser} : UserFavorite) => {
    const router = useRouter();
    const hasFavorite = useMemo( () => {
        const list = currentUser?.favoriteIds || []; 
        return list.includes(communityId);
    }, [currentUser, communityId])

    const toggleFavorite  =async  (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation(); // 이벤트 버블링 방지

        if(!currentUser) {
            toast.warn('먼저 로그인을 해주세요');
            return;
        }

        try {
            let request;

            if(hasFavorite) {
                //좋아요가 이미 있다면 지우기
                request = async () => await axios.delete(`/api/favorites/${communityId}`);
            } else {
                request = async () => await axios.post(`/api/favorites/${communityId}`);
            }

            await request(); //route 요청 결과 기다리기
            //좋아요가 반영된걸 환영에 바로 반영해주기위한 refresh
            router.refresh();
            toast.success('좋아요 성공!');
        } catch(error) {
            toast.error('좋아요 실패..ㅠ');
        }
    }
    return {
        hasFavorite,
        toggleFavorite,
    }
}

export default useFavorite;
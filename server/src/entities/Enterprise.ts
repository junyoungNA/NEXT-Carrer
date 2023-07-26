import { Exclude, Expose } from 'class-transformer';
import { BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import BaseEntity from './Entity';
import { User } from './User';
import Vote from './Vote';
import { makeId, slugify } from '../utilis/helpers';

@Entity("enterprize")
export default class Enterprise extends BaseEntity {
    @Index()
    @Column()
    identifier: string;

    @Column({ nullable: true, type: "text" })
    enterprise : string; //기업이름

    @Column({ nullable: true, type: "text" })
    carrer : string; //경력

    @Column({ nullable: true, type: "text" })
    salary : string; //급여

    @Column({ nullable: true, type: "text" })
    service : string; //서비스 소개

    @Column({ nullable: true, type: "text" })
    mainwork : string; //주요업무

    @Column({ nullable: true, type: "text" })
    qualificate : string; //자격요건

    @Column()
    preferential : string; //우대사항

    @Column()
    endDate : string; //공고 마감일

    @Column({ nullable: true, type: "text" })
    place : string; //근무지

    @Column()
    welfare : string; //복지

    @Column()
    etc : string; //기타 사항

    @Column({ nullable: true, type: "text" })
    title: string; //제목

    @Column({nullable: true, type:'text'})
    imageUrn : string;

    @Index()
    @Column()
    slug: string;

    @Column()
    username: string;

    //기업 post는 유저당 하나만 가능!\
    @ManyToOne(() => User, (user) => user.enterprise)
    @JoinColumn({ name: "username", referencedColumnName: "username" })
    user: User;

    @BeforeInsert()
    makeIdAndSlug() {
        this.identifier = makeId(7);
        this.slug = slugify(this.title);
    }

    @Expose()
    get imageUrl() : string {
        return this.imageUrn ? `${process.env.APP_URL}/images/${this.imageUrn}` :
            'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
    }
}
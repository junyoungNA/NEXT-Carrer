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

    @Column()
    enterprise : string; //기업이름

    @Column()
    carrer : string; //경력

    @Column() 
    salary : string; //급여

    @Column()
    service : string; //서비스 소개

    @Column()
    mainwork : string; //주요업무

    @Column()
    qualificate : string; //자격요건

    @Column()
    preferential : string; //우대사항

    @Column()
    endDate : string; //공고 마감일

    @Column()
    place : string; //근무지

    @Column()
    welfare : string; //복지

    @Column()
    etc : string; //기타 사항

    @Column()
    title: string; //제목

    @Column({nullable: true})
    imageUrn : string;

    @Index()
    @Column()
    slug: string;

    @Column()
    username: string;

    //기업 post는 유저당 하나만 가능!\
    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({ name: "username", referencedColumnName: "username" })
    user: User;

    @BeforeInsert()
    makeIdAndSlug() {
        this.identifier = makeId(7);
        this.slug = slugify(this.title);
    }
}
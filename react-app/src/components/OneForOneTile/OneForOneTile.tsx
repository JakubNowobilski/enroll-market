import * as P from './parts';
import { ReactComponent as Arrow } from '../../assets/arrow_right.svg';
import { OneForOneOffer } from '../../api/models';

export interface OneForOneTileProps {
    offer: OneForOneOffer;
    acceptCallback?: () => void;
    editCallback?: () => void;
    deleteCallback?: () => void;
    reverseOrder?: boolean;
}

const translations = {
    'MONDAY': 'Poniedziałek',
    'TUESDAY': 'Wtorek',
    'WEDNESDAY': 'Środa',
    'THURSDAY': 'Czwartek',
    'FRIDAY': 'Piątek',
    'SATURDAY': 'Sobota',
    'SUNDAY': 'Niedziela',
    'PROJECT': 'Projekt',
    'LABORATORY': 'Laboratorium',
    'LECTURE': 'Wykład',
    'LESSON': 'Ćwiczenia',
}

export const OneForOneTile: React.FC<OneForOneTileProps> = ({ offer, acceptCallback, editCallback, deleteCallback, reverseOrder }) => (
    <P.Container>
        <P.SubjectName>{offer.givenCourse.subject.name}</P.SubjectName>
        <P.OffersBox reverseOrder={reverseOrder}>
            <P.SlotBox>
                <P.Subheader>Oferowany termin</P.Subheader>
                <P.ClassBox isOffered>
                    <b>{offer.givenCourse.teacher.name} {offer.givenCourse.teacher.surname}</b>
                    <b>{translations[offer.givenCourse.dayOfWeek]}, {offer.givenCourse.startTime.hour}:{offer.givenCourse.startTime.minute}</b>
                    <b>{translations[offer.givenCourse.courseType]}</b>
                    {/* <span>{offeredGroup.comment}</span> */}
                    <span>{offer.student.name} {offer.student.surname}</span>
                </P.ClassBox>
            </P.SlotBox>
            <P.SVGBox>
                <Arrow
                    height="100px"
                    width="100px"
                    viewBox="0 -5 25 25"
                />
            </P.SVGBox>
            <P.SlotBox>
                <P.Subheader>Oczekiwany termin</P.Subheader>
                <P.ClassBox>
                    <b>{offer.takenCourse.teacher.name} {offer.takenCourse.teacher.surname}</b>
                    <b>{translations[offer.takenCourse.dayOfWeek]}, {offer.takenCourse.startTime.hour}:{offer.takenCourse.startTime.minute}</b>
                    <b>{translations[offer.takenCourse.courseType]}</b>
                </P.ClassBox>
            </P.SlotBox>
        </P.OffersBox>
        <P.ButtonsBox>
            {acceptCallback && <P.Button onClick={acceptCallback}>Akceptuj</P.Button>}
            {editCallback && <P.Button onClick={editCallback}>Edytuj</P.Button>}
            {deleteCallback && <P.Button onClick={deleteCallback}>Usuń</P.Button>}
        </P.ButtonsBox>
    </P.Container>
);

export default OneForOneTile;

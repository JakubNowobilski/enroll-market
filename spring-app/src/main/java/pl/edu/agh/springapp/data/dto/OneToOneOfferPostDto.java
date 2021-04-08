package pl.edu.agh.springapp.data.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OneToOneOfferPostDto {
    private StudentDto student;
    private SubjectGroupDto givenSubjectGroup;
    private SubjectGroupDto takenSubjectGroup;
}

package com.example.fitgpt.dto;

import com.example.fitgpt.entity.MemoEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class MemoDTO {

    private Long id;
    private Long userId;
    private String date;
    private String content;

    public static MemoDTO toMemoDTO(MemoEntity memoEntity) {
        MemoDTO memoDTO = new MemoDTO();
        memoDTO.setId(memoEntity.getId());
        memoDTO.setUserId(memoEntity.getUserId());
        memoDTO.setDate(memoEntity.getDate());
        memoDTO.setContent(memoEntity.getContent());
        return memoDTO;
    }
}
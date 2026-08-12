do $$
declare
  changed_count integer;
begin
  update public.rules_questions
  set
    option_c = 'Carrying your own valid Ontario licence whenever you drive',
    explanation = 'You must carry your own valid Ontario driver''s licence whenever you drive. Lending, altering or using an imitation licence is illegal.'
  where question_text = 'Which action involving a driver''s licence is legal?'
    and correct_option = 'C'
    and option_c = 'None of these actions; lending, altering or using another person''s licence is illegal';

  get diagnostics changed_count = row_count;

  if changed_count <> 1 then
    raise exception 'Expected to correct exactly one licence question, corrected %', changed_count;
  end if;
end
$$;

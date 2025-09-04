CREATE OR REPLACE FUNCTION get_random_gesture()
RETURNS jsonb AS $$
DECLARE
  gesture_row gestures;
BEGIN
  SELECT * INTO gesture_row FROM gestures ORDER BY random() LIMIT 1;
  RETURN to_jsonb(gesture_row);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;